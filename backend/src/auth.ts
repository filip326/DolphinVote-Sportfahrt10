import { Router } from "express";
import { Db, WithId } from "mongodb";
import IUser from "./types/user";

import { randomBytes } from "node:crypto";

declare global {
    namespace Express {
        interface Request {
            auth?: {
                auth?: boolean;
                user?: WithId<IUser>;
            }
        }
    }
}

export default (db: Db): Router => {
    const router = Router();

    // router.post /register register a new device
    router.post("/register", async (req, res) => {
        const code = req.body.code;
        const name = req.body.name;

        // check if code matches regex /^[A-Z0-9]{8}$/
        if (!code.match(/^[A-Z0-9]{8}$/)) {
            res.status(400).send({ error: "Invalid code" });
            return;
        }

        // check if name and code exists in db
        const result = await db.collection<IUser>("users").findOne({ code: code, name: name });
        if (!result) {
            res.status(401).send("Invalid Name or Code");
            return;
        }

        if (result.device) {
            res.status(403).send("Already registered");
            return;
        }

        // create a device cookie and add it to the db
        // TODO! use crypto.randomBytes instead of Math.random
        const cookie = randomBytes(32).toString("base64");
        // set the device for the user in db
        // TODO! check if db write was successful
        await db.collection<IUser>("users").updateOne({ _id: result._id }, { $set: { device: cookie } });

        // send the cookie to the client
        res.cookie("device", cookie, { maxAge: 1000 * 60 * 60 * 24 * 365 * 10, httpOnly: true, secure: true });
        res.status(200).send({ success: true });
    });

    // for every route below this, check if the device cookie is set and if set the user in req.user
    router.use((req, _, next) => {
        // check if device cookie is set
        if (!req.cookies.device) {
            req.auth = { auth: false };
            next();
        }

        // find the user with the device cookie
        db.collection<IUser>("users").findOne({ device: req.cookies.device }).then((result) => {
            // if no user is found, set auth to false
            if (!result) {
                req.auth = { auth: false, user: undefined };
                next();
            } else {
                // if a user is found, set auth to true and set the user in req.user
                req.auth = { auth: true, user: result };
                next();
            }
        });
    });

    return router;
}

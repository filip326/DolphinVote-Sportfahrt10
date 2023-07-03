import { Router } from "express";
import { Db } from "mongodb";
import IUser from "./types/user";

declare global {
    namespace Express {
        interface Request {
            auth?: {
                auth?: boolean;
                user?: IUser;
            }
        }
    }
}

export default (db: Db): Router => {
    const router = Router();

    // route.post /check-code check if code matches regex /^[A-Z0-9]{8}$/
    router.post("/check-code", async (req, res) => {
        const code = req.body.code;
        if (code.match(/^[A-Z0-9]{8}$/)) {
            res.status(200).send({ valid: true });
        } else {
            res.status(200).send({ valid: false });
        }
    });

    // router.post /register register a new device
    router.post("/register", async (req, res) => {
        const code = req.body.code;
        const name = req.body.name;
        const klasse = req.body.klasse;

        // check if code matches regex /^[A-Z0-9]{8}$/
        if (!code.match(/^[A-Z0-9]{8}$/)) {
            res.status(400).send({ error: "Invalid code" });
            return;
        }

        // check if name and code exists in db
        const result = await db.collection<IUser>("users").findOne({ code: code, name: name, klasse: klasse });
        if (!result) {
            res.status(401).send("No");
            return;
        }

        if (result.device) {
            res.status(403).send("Already registered");
            return;
        }

        // create a device cookie and add it to the db
        const cookie = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        // set the device for the user in db
        await db.collection("users").updateOne({ code: code, name: name, klasse: klasse }, { $set: { device: cookie } });

        // send the cookie to the client
        res.cookie("device", cookie, { maxAge: 1000 * 60 * 60 * 24 * 365 * 10, httpOnly: true });
        res.status(200).send({ success: true, cookie: cookie });
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

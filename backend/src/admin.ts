import { Router } from "express";
import { Db } from "mongodb";
import { randomBytes } from "crypto";
import { compare } from "bcrypt";
import User from "types/user";

interface Admins {
    username: string;
    password: string;
    device: string;
}

interface Settings {
    setting: string;
    value: string | number | boolean;
}

export default function (db: Db): Router {

    const admins = db.collection<Admins>("admins");
    const users = db.collection<User>("users");
    const router = Router();

    // admin login
    router.post("/admin-login", async (req, res) => {
    
        // check if username and password are set
        if (!req.body.username || !req.body.password) {
            res.status(400).send("Bad Request");
            return;
        }

        // check if username and password are valid
        const result = await admins.findOne({ username: req.body.username });
        if (!result) {
            res.status(401).send("Unauthorized");
            return;
        }

        // check if password is correct
        const password = await compare(req.body.password, result.password);
        if (!password) {
            res.status(401).send("Unauthorized");
            return;
        }

        // create a admin cookie and add it to the db
        const cookie = randomBytes(32).toString("base64");
        // set the device for the user in db
        const dbresult = await admins.updateOne({ _id: result._id }, { $set: { device: cookie } });

        // send the cookie to the client
        if (dbresult.acknowledged) {
            res.cookie("admin", cookie, { maxAge: 1000 * 60 * 60 * 24 * 365 * 10, httpOnly: true, secure: true });
            res.status(200).send({ success: true });
        } else {
            res.status(500).send({ error: "Internal Server Error" });
        }
    
    });

    router.get("/setting", async (req, res) => {
        // check if admin cookie is set
        if (!req.cookies.admin) {
            res.status(401).send("Unauthorized");
            return;
        }

        // find the user with the device cookie
        const result = await admins.findOne({ device: req.cookies.admin })
        if (!result) {
            res.status(401).send("Unauthorized");
            return;
        }

        // get setting from db
        const settings = await db.collection<Settings>("settings").find({ setting: req.query.setting as string | undefined }).toArray();

        if (settings.length === 0) {
            res.status(404).send({ error: "Not Found" });
            return;
        }
        
        res.status(200).send(settings);
    })

    router.post("/setting", async (req, res) => {
        // check if admin cookie is set
        if (!req.cookies.admin) {
            res.status(401).send("Unauthorized");
            return;
        }

        // find the user with the device cookie
        const result = await admins.findOne({ device: req.cookies.admin })
        if (!result) {
            res.status(401).send("Unauthorized");
            return;
        }

        // check if setting and value are set
        if (!req.body.setting || !req.body.value) {
            res.status(400).send("Bad Request");
            return;
        }

        // set setting in db
        // insert if not exists
        // overwrite if exists

        const insertResult = await db.collection<Settings>("settings").insertOne({ setting: req.body.setting, value: req.body.value });

        if (insertResult.acknowledged) {
            res.status(200).send({ success: true });
        } else {
            res.status(500).send({ error: "Internal Server Error" });
        }
    })

    router.get("/results", (req, res) => {
        // check if admin cookie is set
        if (!req.cookies.admin) {
            res.status(401).send("Unauthorized");
            return;
        }

        // find the user with the device cookie
        const result = admins.findOne({ device: req.cookies.admin })
        if (!result) {
            res.status(401).send("Unauthorized");
            return;
        }

        // check for queries time and project
        if (!req.query.time || !req.query.project) {
            res.status(400).send("Bad Request");
            return;
        }
        if (typeof req.query.time !== "string" || typeof req.query.project !== "string") {
            res.status(400).send("Bad Request");
            return;
        }

        // find results in db
        const assignedUsers = users.find({ results: { [req.query.time]: req.query.project } }).toArray();
        
        if (assignedUsers.length === 0) {
            res.status(404).send({ error: "Not Found" });
            return;
        }

        res.status(200).send(assignedUsers);
    })

    router.get('/projects', async (req, res) => {
        // check if admin cookie is set
        if (!req.cookies.admin) {
            res.status(401).send("Unauthorized");
            return;
        }

        // find the user with the device cookie
        const result = admins.findOne({ device: req.cookies.admin })
        if (!result) {
            res.status(401).send("Unauthorized");
            return;
        }

        // find projects in db
        const projects = await db.collection("projects").find({
            time: req.query.time as string | undefined
        }).toArray();

        if (projects.length === 0) {
            res.status(404).send({ error: "Not Found" });
            return;
        }

        res.status(200).send(projects);
    });

    router.get("/users", async (req, res) => {
        // check if admin cookie is set
        if (!req.cookies.admin) {
            res.status(401).send("Unauthorized");
            return;
        }

        // find the user with the device cookie
        const result = admins.findOne({ device: req.cookies.admin })
        if (!result) {
            res.status(401).send("Unauthorized");
            return;
        }

        // find users in db
        const users = await db.collection<User>("users").find({}, {
            limit: parseInt(req.query.limit as string | undefined ?? "0") || 20,
            skip: parseInt(req.query.skip as string | undefined ?? "0") || 0
        }).toArray();

        if (users.length === 0) {
            res.status(404).send({ error: "Not Found" });
            return;
        }

        res.status(200).send(users);
    })


    return router;

}
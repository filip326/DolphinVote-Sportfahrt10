import { Router } from "express";
import { Db } from "mongodb";
import { randomBytes } from "crypto";


export default function (db: Db): Router {

    const router = Router();

    // admin login
    router.post("/admin-login", async (req, res) => {
    
        if (!req.body.username || !req.body.password) {
            res.status(400).send("Invalid username or password");
            return;
        }

        if (req.body.username !== process.env.ADMIN_USERNAME || req.body.password !== process.env.ADMIN_PASSWORD) {
            res.status(401).send("Invalid username or password");
            return;
        }

        const token = randomBytes(32).toString("base64");

        res.cookie("admin", token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            secure: true
        });
    
    });

    return router;

}
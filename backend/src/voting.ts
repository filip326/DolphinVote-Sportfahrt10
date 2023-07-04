import { Router } from "express";
import { Db, ObjectId } from "mongodb";
import { VoteOption, VoteTime } from "types/vote";


export default function (db: Db): Router {
    const projectColleciton = db.collection<VoteOption>("projects");

    const router = Router();

    router.get("/votings", async (req, res) => {

        if (!req.auth || req.auth.auth === false || !req.auth.user) {
            res.status(401).send("Unauthorized");
            return;
        }

        res.status(200).send([
            {
                voting: "Mi-Vormittag",
                open: (req.auth.user.votes === undefined || req.auth.user.votes["Mi-Vormittag"] === undefined) // true = not voted yet, false = already voted
            },
            {
                voting: "Mi-Nachmittag",
                open: (req.auth.user.votes === undefined || req.auth.user.votes["Mi-Nachmittag"] === undefined)
            },
            {
                voting: "Do-Vormittag",
                open: (req.auth.user.votes === undefined || req.auth.user.votes["Do-Vormittag"] === undefined)
            },
            {
                voting: "Do-Nachmittag",
                open: (req.auth.user.votes === undefined || req.auth.user.votes["Do-Nachmittag"] === undefined)
            }
        ])

    })

    router.get("/options", async (req, res) => {

        if (!req.auth || req.auth.auth === false) {
            res.status(401).send("Unauthorized");
            return;
        } 

        if (req.query.time !== "Mi-Vormittag"
        && req.query.time !== "Mi-Nachmittag"
        && req.query.time !== "Do-Vormittag"
        && req.query.time !== "Do-Nachmittag") {
            res.status(400).send("Invalid or missing time");
            return;
        }

        const result = await projectColleciton.find({
            time: req.query.time
        }).project({
            _id: 1,
            option_name: 1,
            free_slots: 1,
        }).toArray()        
    })

    router.post("/vote", async (req, res) => {
    
        // check authentication
        if (!req.auth || req.auth.auth === false || !req.auth.user) {
            res.status(401).send("Unauthorized");
            return;
        }

        // check if query time is valid
        if (req.query.time !== "Mi-Vormittag"
        && req.query.time !== "Mi-Nachmittag"
        && req.query.time !== "Do-Vormittag"
        && req.query.time !== "Do-Nachmittag") {
            res.status(400).send("Invalid or missing time");
            return;
        }

        // check if user has already voted for the time
        if (req.auth.user.votes && req.auth.user.votes[req.query.time]) {
            res.status(403).send("Already voted for specified time");
            return;
        }

        // check if body is valid
        // body is supposed to be an array of 3 ObjectIds
        if (!Array.isArray(req.body) || req.body.length !== 3) {
            res.status(400).send("Invalid body");
            return;
        }
        for (const id of req.body) {
            if (typeof id !== "string" || id.match(/^[0-9a-f]{24}$/) === null || !ObjectId.isValid(id)) {
                res.status(400).send("Invalid body");
                return;
            }
        }

        // check if all ids of body are valid projects
        const result = await projectColleciton.find({
            _id: {
                $in: req.body.map(id => new ObjectId(id))
            },
            time: req.query.time
        }).project({
            _id: 1
        }).toArray();
        if (result.length !== 3) {
            res.status(404).send("Project not found");
            return;
        }

        // if all checks passed, save the vote in the db (db.users.votes[time])
        const updateResult = await db.collection("users").updateOne({
            _id: req.auth.user._id
        }, {
            $set: {
                [`votes.${req.query.time}`]: req.body.map(id => new ObjectId(id))
            }
        });

        // check if update was successful
        if (updateResult.modifiedCount !== 1 || !updateResult.acknowledged) {
            res.status(500).send("Internal server error");
            return;
        }

        // send success response
        res.status(200).send("OK");

    });

    router.get('/result', async (req, res) => {
        // check authentication
        if (!req.auth || req.auth.auth === false || !req.auth.user) {
            res.status(401).send("Unauthorized");
            return;
        }
        
        const results = req.auth.user.results;
        if (!results) {
            res.status(404).send("No results found");
            return;
        }
        let votingResults: { [key in VoteTime]?: string } = {};
        for await (const time of Object.keys(results) as VoteTime[]) {
            votingResults[time] = (await projectColleciton.findOne({
                _id: results[time]
            }))?.option_name;
        }
        res.status(200).send(votingResults);
    })


    return router;
}
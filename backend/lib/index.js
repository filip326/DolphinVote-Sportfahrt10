"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongodb_1 = require("mongodb");
const app = (0, express_1.default)();
const path_1 = require("path");
const auth_1 = __importDefault(require("./auth"));
const initdb_1 = __importDefault(require("./initdb"));
const voting_1 = __importDefault(require("./voting"));
const admin_1 = __importDefault(require("./admin"));
async function main() {
    const client = new mongodb_1.MongoClient(process.env.MONGO_URL ?? "");
    await client.connect();
    const db = client.db(process.env.DB_NAME ?? "DolphinVOTE");
    await (0, initdb_1.default)(db);
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use((0, auth_1.default)(db));
    /*
    Vote
    */
    app.use((0, voting_1.default)(db));
    /*
    Admin
    */
    app.use((0, admin_1.default)(db));
    app.post("/vote", async (req, res) => {
        // check if user is logged in
        if (!req.auth?.user) {
            res.status(401).redirect("/");
            return;
        }
        // todo
    });
    app.use(express_1.default.static(process.env.PUBLIC_DIR ?? "public"));
    app.use((req, res) => {
        if (req.method === "GET") {
            res.sendFile((0, path_1.join)(process.env.PUBLIC_DIR ?? "public", "index.html"));
            return;
        }
        else {
            return;
        }
    });
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
}
main();

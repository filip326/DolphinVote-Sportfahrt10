import { config as dotenv } from "dotenv";
dotenv();

import express from "express";
import cookieParser from "cookie-parser";
import { MongoClient, WithId } from "mongodb";
const app = express();

import IUser from './types/user'
import { join } from "path";

declare global {
  namespace Express {
    interface User extends WithId<IUser> { }
  }
}

import auth from "./auth";
import initdb from "initdb";

async function main() {

  const client = new MongoClient(process.env.MONGO_URL ?? "");
  await client.connect();
  const db = client.db(process.env.DB_NAME ?? "Sportfahrt");

  await initdb(db);

  app.use(express.json());
  app.use(cookieParser());

  app.use(auth(db));

  app.use(express.static(process.env.PUBLIC_DIR ?? "public"));

  app.use((req, res) => {
    if (req.method === "GET") {
      res.sendFile(join(process.env.PUBLIC_DIR ?? "public", "index.html"));
      return;
    } else {
      return;
    }
  })

  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
}

main();

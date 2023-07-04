import { Router } from "express";
import { Db } from "mongodb";
import IUser from "./types/user";
declare global {
    namespace Express {
        interface Request {
            auth?: {
                auth?: boolean;
                user?: IUser;
            };
        }
    }
}
declare const _default: (db: Db) => Router;
export default _default;

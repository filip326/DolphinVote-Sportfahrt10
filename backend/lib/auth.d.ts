import { Router } from "express";
import { Db, WithId } from "mongodb";
import IUser from "./types/user";
declare global {
    namespace Express {
        interface Request {
            auth?: {
                auth?: boolean;
                user?: WithId<IUser>;
            };
        }
    }
}
declare const _default: (db: Db) => Router;
export default _default;

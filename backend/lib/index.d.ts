import { WithId } from "mongodb";
import IUser from './types/user';
declare global {
    namespace Express {
        interface User extends WithId<IUser> {
        }
    }
}

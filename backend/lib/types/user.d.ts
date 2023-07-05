import { ObjectId } from "mongodb";
import { type VoteTime } from "./vote";
export default interface User {
    code: string;
    name: string;
    device?: string;
    votes?: {
        [key in VoteTime]?: ObjectId[];
    };
    results?: {
        [key in VoteTime]?: ObjectId;
    };
}

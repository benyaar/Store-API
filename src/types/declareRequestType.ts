import {UserType} from "../models/models";

declare global{
    namespace Express {
        export interface Request {
            user: UserType | null
        }
    }
}
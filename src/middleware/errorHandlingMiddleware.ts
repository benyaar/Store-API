import {Request, Response} from "express";
import {ApiError} from "../error/apiError";

export const errorHandlingMiddleware = (err: any, req: Request, res: Response) => {
    if(err instanceof ApiError){
        res.status(err.status).send({message: err.message})
    }
    return res.status(500).send({message: 'Server exception'})
}
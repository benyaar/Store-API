import { Request, Response, NextFunction } from "express";

export default function errorHandlerMiddleware(
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
) {
    return response.status(error.status).json({error: error.message});
}
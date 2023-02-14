import {NextFunction, Response, Request} from "express";
import jwt from "jsonwebtoken";

export const authMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    const secret = process.env.SECRET_KEY || 'qwerty'
    if(req.method === 'OPTIONS'){
        next()
    }
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) return res.status(401).send({message: 'Unauthorized'})
        const result: any = jwt.verify(token, secret)
        req.user = result
        next()
    } catch (e){
        return res.status(401).send({message: 'Unauthorized'})
    }
}
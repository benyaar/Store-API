import {NextFunction, Response, Request} from "express";
import jwt from "jsonwebtoken";

export const checkRoleMiddleWare = (role: string) => {
    return  function (req: Request, res: Response, next: NextFunction){
        const secret = process.env.SECRET_KEY || 'qwerty'
        if(req.method === 'OPTIONS'){
            next()
        }
        try {
            const token = req.headers.authorization?.split(' ')[1]
            if (!token) return res.status(401).send({message: 'Unauthorized'})
            const result: any = jwt.verify(token, secret)
            if (result.role !== role ) return  res.status(403).send({message: "Forbidden"})
            req.user = result
            next()
        } catch (e){
            return res.status(401).send({message: 'Unauthorized'})
        }
    }
}
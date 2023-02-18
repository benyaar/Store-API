import {NextFunction, Request, Response} from "express";
import {Basket, User} from "../models/models";
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {ApiError} from "../error/apiError";

const generateJWT = async (id: number, email: string, role: string) => {
    const secret = process.env.SECRET_KEY || 'qwerty'
    const token = jwt.sign({id, email, role}, secret, {expiresIn: '24h'})
    return token
}

class UserController {
    async registration(req: Request, res:Response, next: NextFunction){
            const {email, password, role } = req.body
           if(!email || !password)  return next(ApiError.badRequest("Invalid email or user"));

            const candidate = await User.findOne({where: {email}})
            if(candidate) return res.status(400).send({message: 'Email is exist'})
            const hashPassword = await bcrypt.hash(password, 5)
            const user:any = await User.create({email, role, password: hashPassword})
            await Basket.create({userId: user.dataValues.id})
            const token = await generateJWT(user.dataValues.id, email, role)
            return res.send(token)
    }

    async login(req: Request, res:Response, next: NextFunction){
        const {email, password} = req.body
        const user:any = await User.findOne({where:{email}})
        if(!user) return res.sendStatus(404)
        let comparePassword = await bcrypt.compare(password, user.password)
        if(!comparePassword) return res.sendStatus(404)
        const token  = await generateJWT(user.dataValues.id, email, user.dataValues.role)
        return res.send(token)
    }

    async check(req: Request, res:Response, next: NextFunction){
        const {id, email, role} = req.user!
        if(!id || !email || !role) return res.sendStatus(401)
        const token = await generateJWT(id, email, role )
        return res.send(token)
    }
}

export const userController = new UserController()


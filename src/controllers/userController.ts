import {Request, Response} from "express";

class UserController {
    async registration(req: Request, res:Response){
        const {title } = req.body


    }

    async login(req: Request, res:Response){

    }

    async check(req: Request, res:Response){

    }
}

export const userController = new UserController()


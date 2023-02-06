import {Request, Response} from "express";
import {Type} from "../models/models";

class TypeController {
    async create(req: Request, res:Response){
        const {name} = req.body
        const type = await Type.create({name})
        return res.status(201).send(type)

    }

    async getAll(req: Request, res:Response){
        const types = await Type.findAll()
        return res.status(200).send(types)
    }
}

export const typeController = new TypeController()


import {Request, Response} from "express";
import {Brand} from "../models/models";

class BrandController {
    async create(req: Request, res:Response){
        const {name} = req.body
        const type = await Brand.create({name})
        return res.status(201).send(type)

    }

    async getAll(req: Request, res:Response){
        const types = await Brand.findAll()
        return res.status(200).send(types)
    }
}

export const brandController = new BrandController()


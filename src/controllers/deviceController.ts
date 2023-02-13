import {NextFunction, Request, Response} from "express";
import {Device} from "../models/models";
import {ApiError} from "../error/apiError";

class DeviceController {
    async create(req: Request, res:Response, next:NextFunction){
        try{
            const {name, price, brandId, typeId} = req.body
            const filedata = req.file;
            if(!filedata) return next(ApiError.badRequest("Not images"))

            const device = await Device.create({name, price, brandId, typeId, img: filedata.filename})
            return res.status(201).send(device)
        }catch (e: any) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req: Request, res:Response){

    }

    async getOne(req: Request, res:Response){

    }
}

export const deviceController = new DeviceController()


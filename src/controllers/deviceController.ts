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
        let {brandId, typeId} = req.query
        const page = req.query.page ? +req.query.page : 1
        const limit = req.query.limit ? +req.query.limit : 9
        const offset = page * limit - limit
        let devices;
        if(!brandId && !typeId){
            devices = await Device.findAndCountAll({limit, offset})
        }
        if(brandId && !typeId){
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset})
        }
        if(!brandId && typeId){
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset})
        }
        if(brandId && typeId){
            devices = await Device.findAndCountAll({where:{typeId, brandId},limit, offset})
        }
        return res.send(devices)
    }

    async getOne(req: Request, res:Response){

    }
}

export const deviceController = new DeviceController()


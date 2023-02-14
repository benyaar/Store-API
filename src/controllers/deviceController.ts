import {NextFunction, Request, Response} from "express";
import {Device, DeviceInfo, DeviceInfoType} from "../models/models";
import {ApiError} from "../error/apiError";

class DeviceController {
    async create(req: Request, res:Response, next:NextFunction){
        try{
            let {name, price, brandId, typeId, info} = req.body
            const filedata = req.file;
            if(!filedata) return next(ApiError.badRequest("Not images"))

            const device:any = await Device.create({name, price, brandId, typeId, img: filedata.filename})

            if(info){
                info = JSON.parse(info)
                info.forEach( (i:DeviceInfoType) => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                })
            }
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
        const {id} = req.params
        const device = await Device.findOne({where: {id}, include: [{model: DeviceInfo, as: 'info'}]})
        return res.send(device)
    }
}

export const deviceController = new DeviceController()


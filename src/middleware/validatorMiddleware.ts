import {NextFunction, Request, Response} from "express";
import {body, validationResult} from 'express-validator'

export const expressValidator = (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errorsMessages: errors.array({onlyFirstError: true}).map( e => {
                return {message: e.msg, field: e.param}

            }) });
    }
    next()
}

const deviceName = body('name').isEmpty()
const devicePrice = body('price').isEmpty()
const deviceBrandId = body('brandId').isEmpty()
const deviceTypeId = body('typeId').isEmpty()
const deviceInfo = body('info').default(false)

export const deviceValidator = [deviceName, devicePrice, deviceBrandId, deviceTypeId, deviceInfo, expressValidator]
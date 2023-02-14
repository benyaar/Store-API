import {Router} from "express";
import {deviceController} from "../controllers/deviceController";
import {multerMiddleware} from "../middleware/multerMiddleWare";
import {checkRoleMiddleWare} from "../middleware/checkRoleMiddleWare";
import {deviceValidator} from "../middleware/validatorMiddleware";

export const deviceRouter = Router({})

deviceRouter.post('/', checkRoleMiddleWare('ADMIN'), deviceValidator, multerMiddleware.single('file'), deviceController.create)
deviceRouter.get('/', deviceController.getAll)
deviceRouter.get('/:id', deviceController.getOne)

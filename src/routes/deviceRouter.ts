import {Router} from "express";
import {deviceController} from "../controllers/deviceController";
import {multerMiddleware} from "../middleware/multerMiddleWare";

export const deviceRouter = Router({})

deviceRouter.post('/', multerMiddleware.single('file'), deviceController.create)
deviceRouter.get('/', deviceController.getAll)
deviceRouter.get('/:id', deviceController.getOne)

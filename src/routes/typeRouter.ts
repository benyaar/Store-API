import {Router} from "express";
import {typeController} from "../controllers/typeController";
import {checkRoleMiddleWare} from "../middleware/checkRoleMiddleWare";

export const typeRouter = Router({})

typeRouter.post('/', checkRoleMiddleWare('ADMIN'), typeController.create)
typeRouter.get('/', typeController.getAll)

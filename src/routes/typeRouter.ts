import {Router} from "express";
import {typeController} from "../controllers/typeController";

export const typeRouter = Router({})

typeRouter.post('/', typeController.create)
typeRouter.get('/', typeController.getAll)

import {Router} from "express";
import {brandController} from "../controllers/brandController";
import {checkRoleMiddleWare} from "../middleware/checkRoleMiddleWare";

export const brandRouter = Router({})

brandRouter.post('/', checkRoleMiddleWare('ADMIN'), brandController.create)
brandRouter.get('/', brandController.getAll)

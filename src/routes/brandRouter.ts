import {Router} from "express";
import {brandController} from "../controllers/brandController";

export const brandRouter = Router({})

brandRouter.post('/', brandController.create)
brandRouter.get('/', brandController.getAll)

import {Router} from "express";
import {userController} from "../controllers/userController";
import {authMiddleWare} from "../middleware/authMiddleWare";

export const userRouter = Router({})

userRouter.post('/registration', userController.registration)
userRouter.post('/login', userController.login)
userRouter.get('/auth', authMiddleWare, userController.check)
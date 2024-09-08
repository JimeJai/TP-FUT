import { Router } from "express";
import AuthController from "../controllers/auth";
import checkToken from "../middlewares/check-token";
import { Request, Response, NextFunction } from "express";

const authRouter = Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.post("/logout", checkToken, AuthController.logout); //logout?

export default authRouter;

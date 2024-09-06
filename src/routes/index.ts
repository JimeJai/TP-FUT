import { Router } from "express";
import authRouter from "./auth";
import teamsRouter from "./teams";
import checkToken from "../middlewares/check-token";
import playersRouter from "./players";
const indexRouter = Router();

indexRouter.use("/auth", authRouter); //es use aca?
indexRouter.use("/players", playersRouter);
indexRouter.use("/teams", teamsRouter); //para todo hace falta el token? o puedo ponerlo en las q me reescriben bd?
// indexRouter.use("/users"); // no se  onda esto, nadie deberia poder acceder a los users

export default indexRouter;

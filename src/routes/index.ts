import { Router } from "express";
import authRouter from "./auth";
import teamsRouter from "./teams";
import playersRouter from "./players";
import usersRouter from "./users";
const indexRouter = Router();

indexRouter.use("/auth", authRouter);
indexRouter.use("/players", playersRouter);
indexRouter.use("/teams", teamsRouter);
indexRouter.use("/users", usersRouter);

export default indexRouter;

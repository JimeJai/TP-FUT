import { Router } from "express";
import UsersController from "../controllers/users";
import checkToken from "../middlewares/check-token";
const usersRouter = Router();

usersRouter.get("/", UsersController.getAll);
usersRouter.get("/:id", UsersController.getById);
usersRouter.patch("/:id", checkToken, UsersController.updateById);
usersRouter.delete("/:id", checkToken, UsersController.deleteById);

export default usersRouter;

import { Router } from "express";
import PlayersController from "../controllers/players";
import checkToken from "../middlewares/check-token";
const playersRouter = Router();

playersRouter.get("/", PlayersController.getByFilters);
playersRouter.get("/:id", PlayersController.getById);
playersRouter.patch("/:id", checkToken, PlayersController.updateById);
playersRouter.post("/", checkToken, PlayersController.create);
playersRouter.delete("/:id", checkToken, PlayersController.deleteById);

export default playersRouter;

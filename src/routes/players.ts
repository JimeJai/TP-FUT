import { Router } from "express";
import PlayersController from "../controllers/players";
const playersRouter = Router();

playersRouter.get("/", PlayersController.getAll); //ok
playersRouter.get("/:id", PlayersController.getById); //ok
playersRouter.patch("/:id", PlayersController.updateById); //ok
playersRouter.post("/", PlayersController.create); //ok
playersRouter.delete("/:id", PlayersController.deleteById); //ok
//playersRouter.get("/:name", PlayersController.getByName); //-------no anda

export default playersRouter;

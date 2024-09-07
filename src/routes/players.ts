import { Router } from "express";
import PlayersController from "../controllers/players";
const playersRouter = Router();

playersRouter.get("/", PlayersController.getByFilters); //ok
playersRouter.get("/:id", PlayersController.getById); //ok
//playersRouter.get("/:name", PlayersController.getByName); //-------no anda xq entra a getById
playersRouter.patch("/:id", PlayersController.updateById); //ok
playersRouter.post("/", PlayersController.create); //ok
playersRouter.delete("/:id", PlayersController.deleteById); //ok

export default playersRouter;

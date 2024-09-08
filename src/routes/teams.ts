import { Router } from "express";
import TeamsController from "../controllers/teams";
import checkToken from "../middlewares/check-token";
const teamsRouter = Router();

teamsRouter.get("/", TeamsController.getByFilters);
teamsRouter.get("/:id", TeamsController.getById);
teamsRouter.patch("/:id", checkToken, TeamsController.updateById);
teamsRouter.post("/", checkToken, TeamsController.create);
teamsRouter.delete("/:id", checkToken, TeamsController.deleteById); //ok token

export default teamsRouter;

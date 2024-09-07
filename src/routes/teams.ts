import { Router } from "express";
import TeamsController from "../controllers/teams";
const teamsRouter = Router();

teamsRouter.get("/", TeamsController.getByFilters); //ok
teamsRouter.get("/:id", TeamsController.getById); //ok
teamsRouter.patch("/:id", TeamsController.updateById); //ok
teamsRouter.post("/", TeamsController.create); //ok
teamsRouter.delete("/:id", TeamsController.deleteById); //ok

export default teamsRouter;

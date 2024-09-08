import TeamsService from "../services/teams";
import { NextFunction, Request, Response } from "express";
class TeamsController {
  static async getByFilters(req: Request, res: Response, next: NextFunction) {
    try {
      const db = await TeamsService.getByFilters(req.query);
      res.status(200).json({ message: db });
    } catch (error) {
      next(error);
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newTeam = await TeamsService.create(req.body);
      res.status(200).json({ message: "Equipo creado", newTeam });
    } catch (error) {
      next(error);
    }
  }
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const team = await TeamsService.getById(req.params.id); //params?

      res.status(200).json({ message: team });
    } catch (error) {
      next(error);
    }
  }

  static async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const teamUpdated = await TeamsService.updateById(
        req.params.id,
        req.body
      );

      res.status(200).json({ message: "Equipo actualizado", teamUpdated });
    } catch (error) {
      next(error);
    }
  }

  static async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const teamDeleted = await TeamsService.deleteById(req.params.id);
      res.status(200).json({ message: "Equipo eliminado", teamDeleted });
    } catch (error) {
      next(error);
    }
  }
}
export default TeamsController;

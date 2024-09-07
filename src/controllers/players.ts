import PlayersService from "../services/players";
import { NextFunction, Request, Response } from "express";
class PlayersController {
  // static async getAll(req: Request, res: Response, next: NextFunction) {
  //   //ese data tiene q servir para el .includes..?..no xq no me interesa esa busqueda
  //   try {
  //     const db = await PlayersService.getAll(req.query); //req.query x parametro si quiero
  //     res.status(200).json({ message: db });
  //   } catch (error) {
  //     next(error); //?
  //   }
  // }
  static async create(req: Request, res: Response, next: NextFunction) {
    //valida q le llega una description y un nombre y le crea un id. schemas para descript..
    try {
      const newPlayer = await PlayersService.create(req.body);

      res.status(200).json({ message: "Jugadore creade", newPlayer });
    } catch (error) {
      next(error);
    }
  }
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const player = await PlayersService.getById(req.params.id); //params?

      res.status(200).json({ message: player });
    } catch (error) {
      next(error);
    }
  }

  static async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const playerUpdated = await PlayersService.updateById(
        req.params.id,
        req.body
      );
      //console.log(playerUpdated);

      res.status(200).json({ message: "Jugadore actualizado", playerUpdated }); //no me retorna nada en teamUpdated
    } catch (error) {
      next(error);
    }
  }

  static async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const playerDeleted = await PlayersService.deleteById(req.params.id);
      res.status(200).json({ message: "Jugadore eliminade", playerDeleted });
    } catch (error) {
      next(error);
    }
  }
  static async getByName(req: Request, res: Response, next: NextFunction) {
    try {
      const player = await PlayersService.getByName(req.params.name); //params?

      res.status(200).json({ message: player });
    } catch (error) {
      next(error);
    }
  }

  static async getByFilters(req: Request, res: Response, next: NextFunction) {
    try {
      const players = await PlayersService.getAll(req.query); //params?req.query

      res.status(200).json({ message: players });
    } catch (error) {
      next(error);
    }
  }
}
export default PlayersController;

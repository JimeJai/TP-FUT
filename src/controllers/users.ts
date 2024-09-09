import UsersService from "../services/users";
import { NextFunction, Request, Response } from "express";

class UsersController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const db = await UsersService.read();
      res.status(200).json({ message: db });
    } catch (error) {
      next(error);
    }
  }
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UsersService.getById(req.params.id);
      res.status(200).json({ message: user });
    } catch (error) {
      next(error);
    }
  }

  static async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const userUpdated = await UsersService.updateById(
        req.params.id,
        req.body
      );

      res.status(200).json({ message: "User actualizado", userUpdated });
    } catch (error) {
      next(error);
    }
  }
  static async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const userDeleted = await UsersService.deleteById(req.params.id);
      res.status(200).json({ message: "Usuario eliminado", userDeleted });
    } catch (error) {
      next(error);
    }
  }
}

export default UsersController;

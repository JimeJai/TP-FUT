import { NextFunction, Request, Response } from "express";
import AuthModel from "../models/auth";

async function checkToken(req: Request, res: Response, next: NextFunction) {
  const token = req.query.token;

  if (!token)
    return res.status(400).json({ message: "El token es obligatorio" });

  const authDb = await AuthModel.read();
  const user = authDb.auth.find((auth) => auth.token == token);

  if (!user) return res.status(401).json({ message: "token inválido" });

  next();
}

export default checkToken;

import AuthService from "../services/auth";

class AuthController {
  static async register(req, res, next) {
    try {
      const token = await AuthService.register(req.body);
      res.status(200).json({ message: "Usuario registrado", token });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const token = await AuthService.login(req.body);
      res.status(201).json({ message: "Usuario logueado", token });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
      await AuthService.logout(req.body);
      res.status(201).json({ message: "Usuario des?logueado" }); //no retorna token ya q lo borro
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;

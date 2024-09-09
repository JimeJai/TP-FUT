import AuthModel from "../models/auth";
import UsersService from "./users";
import { v4 as uuidv4 } from "uuid";
import createHash from "../utils/create-hash";
import { validateRegisterUser, validateLoginUser } from "../schemas/users";

class AuthService {
  static async register(data: { name: string; email: string; pass: string }) {
    try {
      const { name, email, pass } = data;
      const result = validateRegisterUser(data);
      if (!result.success) {
        const error = new Error("Datos de registro inválidos");
        error["statusCode"] = 400;

        throw error;
      }

      const userDb = await UsersService.read();
      const user = userDb.users.find((user) => user.email == data.email);
      if (user) {
        const error = new Error("Usuario existente");
        error["statusCode"] = 400;

        throw error;
      }
      const userId = await UsersService.create({ name, email });

      const authDb = await AuthModel.read();
      const token = createHash(uuidv4());
      authDb.auth.push({
        id: uuidv4(),
        userId: userId,
        pass: createHash(pass),
        token: token,
      });
      AuthModel.write(authDb);
      return token;
    } catch (error) {
      throw error;
    }
  }
  static async login(data: { email; pass }) {
    try {
      const { email, pass } = data;
      const result = validateLoginUser(data);
      if (!result.success) {
        const error = new Error("Datos de logueo inválidos");
        error["statusCode"] = 400;

        throw error;
      }
      const user = await UsersService.getByEmail(email);

      const authDb = await AuthModel.read();

      const userAuthFound = authDb.auth.find((auth) => auth.userId == user.id);
      if (userAuthFound.pass != createHash(pass)) {
        const error = new Error("Contraseña incorrecta");
        error["statusCode"] = 400;

        throw error;
      }
      const token = createHash(uuidv4());
      userAuthFound.token = token;
      await AuthModel.write(authDb);

      return userAuthFound.token;
    } catch (error) {
      throw error;
    }
  }

  static async logout(data) {
    try {
      const authDb = await AuthModel.read();

      const auth = authDb.auth.find((auth) => auth.token == data.token);

      if (!auth) {
        const error = new Error("token no encontrado");
        error["statusCode"] = 404;

        throw error;
      }

      auth.token = null;

      await AuthModel.write(authDb);
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;

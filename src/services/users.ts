import UsersModel from "../models/users";
import { v4 as uuidv4 } from "uuid";

class UsersService {
  static async create(data: { name: string; email: string }) {
    try {
      const db = await UsersModel.read();
      const id = uuidv4();
      db.users.push({ name: data.name, email: data.email, id: id });

      UsersModel.write(db);
      return id;
    } catch (error) {
      throw error;
    }
  }

  static async read() {
    const db = UsersModel.read();
    return db;
  }

  static async getByEmail(email) {
    try {
      const db = await UsersService.read();

      const user = db.users.find((user) => email == user.email);
      if (!user) {
        const error = new Error("Usuario no encontrado");
        error["statusCode"] = 404;

        throw error;
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}

export default UsersService;

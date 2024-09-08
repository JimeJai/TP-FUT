import UsersModel from "../models/users";
import { v4 as uuidv4 } from "uuid";
import { validateUpdatedUser } from "../schemas/users";
import checkToken from "../middlewares/check-token";

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

  static async getByFilters(where) {
    try {
      const db = await UsersModel.read();

      if (!where || Object.keys(where).length == 0) {
        return db;
      }

      if (where.email) {
        const user = db.users.find((user) => user.email == where.email);

        if (!user) {
          const error = new Error("Usuario no encontrado");
          error["statusCode"] = 400;

          throw error;
        }
        return user;
      }
    } catch (error) {
      throw error;
    }
  }

  static async getById(id: string) {
    //queria usarlas de update y delete byId pero no me salio..(no entendi el map)
    try {
      const db = await UsersModel.read();
      const user = db.users.find((user) => user.id == id);
      if (!user) {
        const error = new Error("Usuario no encontrado");
        error["statusCode"] = 400;

        throw error;
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async updateById(id: string, data: { name: string; email: string }) {
    try {
      const db = await UsersModel.read();

      const user = db.users.find((user) => user.id == id);

      if (!user) {
        const error = new Error("Usuario no encontrado");
        error["statusCode"] = 400;

        throw error;
      }
      const result = validateUpdatedUser(data); //deberia validar q me mande o email o name
      if (!result.success) {
        const error = new Error("Datos inválidos"); //salta este mensaje y no los mensajes q tiene adentro la funcion ej: cantidad caracteres
        error["statusCode"] = 400;

        throw error;
      }
      let users = db.users.map((user) => {
        if (user.id == id) {
          return { ...user, ...data };
        } else return user;
      });

      db.users = users;
      await UsersModel.write(db);

      const userUpdated = await this.getById(id);
      return userUpdated;
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(id: string) {
    try {
      const db = await UsersModel.read();
      const userDeleted = db.users.find((user) => user.id == id);
      if (!userDeleted) {
        const error = new Error("Equipo no encontrado");
        error["statusCode"] = 400;

        throw error;
      }
      let users = db.users.filter((user) => user.id != id);
      db.users = users;

      await UsersModel.write(db);
      return userDeleted; //tengo q retornar el user eliminado
    } catch (error) {
      throw error;
    }
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
//-------------------------------------------------------------------------------------

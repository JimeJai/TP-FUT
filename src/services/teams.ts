import TeamsModel from "../models/teams";
import { v4 as uuidv4 } from "uuid";
import { validateTeam, validateTeamUp } from "../schemas/teams";

class TeamsService {
  static async getAll() {
    //ese data tiene q servir para el .includes..?..no xq no me interesa esa busqueda
    try {
      const db = await TeamsModel.read();

      return db; //todos los equipos rivales y las desc, casi q quiero la db..asi es igual a lA funcion read del model
    } catch (error) {
      throw error;
    }
  }
  static async create(data: { name: string; description: string }) {
    //si y ocargo 2 equipos con el mismo nombre lo hace.. podria ser un problema?
    try {
      const id = uuidv4();
      const { name, description } = data;
      const result = validateTeam(data);
      if (!result.success) {
        const error = new Error("Datos inválidos");
        error["statusCode"] = 400;

        throw error;
      }
      const newTeam = { name: name, description: description, id: id };

      const db = await TeamsModel.read();

      db.teams.push(newTeam);

      await TeamsModel.write(db);
      return newTeam;
    } catch (error) {
      throw error;
    }
  }
  static async getById(id: string) {
    //queria usarlas de update y delete byId pero no me salio..(no entendi el map)
    try {
      const db = await TeamsModel.read();
      const team = db.teams.find((team) => team.id == id);
      if (!team) {
        const error = new Error("Equipo no encontrado");
        error["statusCode"] = 400;

        throw error;
      }
      return team;
    } catch (error) {
      throw error;
    }
  }

  static async updateById(
    id: string,
    data: { name: string; description: string }
  ) {
    try {
      const db = await TeamsModel.read();

      const team = db.teams.find((team) => team.id == id);

      if (!team) {
        const error = new Error("Equipo no encontrado");
        error["statusCode"] = 400;

        throw error;
      }
      const result = validateTeamUp(data);
      if (!result.success) {
        const error = new Error("Datos inválidos"); //salta este mensaje y no los mensajes q tiene adentro la funcion ej: cantidad caracteres
        error["statusCode"] = 400;

        throw error;
      }
      let teams = db.teams.map((team) => {
        if (team.id == id) {
          return { ...team, ...data };
        } else return team;
      });

      db.teams = teams;
      await TeamsModel.write(db);

      //--------------------------------------------tengo q retornar el nuevo team updated
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(id: string) {
    try {
      const db = await TeamsModel.read();
      const teamDeleted = db.teams.find((team) => team.id == id);
      if (!teamDeleted) {
        const error = new Error("Equipo no encontrado");
        error["statusCode"] = 400;

        throw error;
      }
      let teams = db.teams.filter((team) => team.id != id);
      db.teams = teams;
      console.log(db);

      await TeamsModel.write(db);
      return teamDeleted; //tengo q retornar el team eliminado
    } catch (error) {
      throw error;
    }
  }

  static async getByName(name) {
    //queria usarlas de update y delete byId pero no me salio..(no entendi el map)
    try {
      const db = await TeamsModel.read();
      //console.log(db);
      // const team = db.teams.filter((te) => te.name == where.name);
      //console.log(team);

      const team = db.teams.find((team) => team.name == name); //aca no lo encuentra, es team.name?
      //console.log(team);

      if (!team) {
        const error = new Error("Equipo no encontrado");
        error["statusCode"] = 400;

        throw error;
      }
      return team;
    } catch (error) {
      throw error;
    }
  }
}

export default TeamsService;

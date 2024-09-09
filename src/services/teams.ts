import TeamsModel from "../models/teams";
import { v4 as uuidv4 } from "uuid";
import { validateTeam, validateTeamUp } from "../schemas/teams";

class TeamsService {
  static async getByFilters(where) {
    try {
      const db = await TeamsModel.read();

      if (!where || Object.keys(where).length == 0) {
        return db;
      }

      if (where.name) {
        const teams = db.teams.filter((team) => team.name.includes(where.name));

        if (Object.keys(teams).length == 0) {
          const error = new Error("Equipo no encontrado");
          error["statusCode"] = 400;

          throw error;
        }
        return teams;
      }
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
        const error = new Error("Datos inválidos");
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

      const teamUpdated = await this.getById(id);
      return teamUpdated;
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

      await TeamsModel.write(db);
      return teamDeleted;
    } catch (error) {
      throw error;
    }
  }
}

export default TeamsService;

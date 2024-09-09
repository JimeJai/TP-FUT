import PlayersModel from "../models/players";
import { v4 as uuidv4 } from "uuid";
import { validatePlayer, validatePlayerUp } from "../schemas/players";
import { player } from "../utils/interfaz";

class PlayersService {
  static async getAll(where) {
    try {
      const db = await PlayersModel.read();

      if (!where || Object.keys(where).length == 0) {
        return db;
      }

      if (where.name) {
        const players = db.players.filter((play) =>
          play.name.includes(where.name)
        );
        if (Object.keys(players).length == 0) {
          const error = new Error("Jugadore no encontrade");
          error["statusCode"] = 400;

          throw error;
        }
        return players;
      }
      if (where.condition) {
        const playersAct = db.players.filter(
          (play) => play.condition == where.condition
        );
        if (Object.keys(playersAct).length == 0) {
          const error = new Error("Jugadore no encontrade");
          error["statusCode"] = 400;

          throw error;
        }
        return playersAct;
      }

      if (where.position) {
        const playersPos = db.players.filter(
          (play) => play.position == where.position
        );
        if (Object.keys(playersPos).length == 0) {
          const error = new Error("Jugadore no encontrade");
          error["statusCode"] = 400;

          throw error;
        }
        return playersPos;
      }
    } catch (error) {
      throw error;
    }
  }
  static async create(data: player) {
    try {
      const id = uuidv4();
      const { name, position, condition, numero } = data;
      const result = validatePlayer(data);
      if (!result.success) {
        const error = new Error("Datos inválidos");
        error["statusCode"] = 400;

        throw error;
      }
      const newPlayer = {
        name: name,
        position: position,
        condition: condition,
        numero: numero,
        id: id,
      };

      const db = await PlayersModel.read();

      db.players.push(newPlayer);

      await PlayersModel.write(db);
      return newPlayer;
    } catch (error) {
      throw error;
    }
  }
  static async getById(id: string) {
    try {
      const db = await PlayersModel.read();
      const player = db.players.find((player) => player.id == id);
      if (!player) {
        const error = new Error("Jugadore no encontrade");
        error["statusCode"] = 400;

        throw error;
      }
      return player;
    } catch (error) {
      throw error;
    }
  }

  static async updateById(id: string, data: player) {
    try {
      const db = await PlayersModel.read();

      const player = db.players.find((player) => player.id == id);

      if (!player) {
        const error = new Error("Equipo no encontrado");
        error["statusCode"] = 400;

        throw error;
      }
      const result = validatePlayerUp(data);
      if (!result.success) {
        const error = new Error("Datos inválidos");
        error["statusCode"] = 400;

        throw error;
      }
      let players = db.players.map((player) => {
        if (player.id == id) {
          return { ...player, ...data };
        } else return player;
      });

      db.players = players;
      await PlayersModel.write(db);
      const playerUpdated = await this.getById(id);
      return playerUpdated;
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(id: string) {
    try {
      const db = await PlayersModel.read();
      const playerDeleted = db.players.find((player) => player.id == id);
      if (!playerDeleted) {
        const error = new Error("Jugadore no encontrado");
        error["statusCode"] = 400;

        throw error;
      }
      let players = db.players.filter((player) => player.id != id);
      db.players = players;

      await PlayersModel.write(db);
      return playerDeleted;
    } catch (error) {
      throw error;
    }
  }
}

export default PlayersService;

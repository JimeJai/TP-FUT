import { writeFile, readFile } from "jsonfile";

class PlayersModel {
  static async read() {
    try {
      const db = await readFile("./src/database/players.json");

      return db;
    } catch (error) {
      throw error;
    }
  }

  static async write(data) {
    try {
      const db = await writeFile("./src/database/players.json", data);
      return db;
    } catch (error) {
      throw error;
    }
  }
}

export default PlayersModel;

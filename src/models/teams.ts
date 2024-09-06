import { writeFile, readFile } from "jsonfile";

class TeamsModel {
  static async read() {
    try {
      const db = await readFile("./src/database/teams.json");

      return db;
    } catch (error) {
      throw error;
    }
  }

  static async write(data) {
    try {
      const db = await writeFile("./src/database/teams.json", data);
      return db;
    } catch (error) {
      throw error;
    }
  }
}

export default TeamsModel;

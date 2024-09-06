import { writeFile, readFile } from "jsonfile";

class UsersModel {
  static async read() {
    try {
      const db = await readFile("./src/database/users.json");
      return db;
    } catch (error) {
      throw error;
    }
  }

  static async write(data) {
    try {
      const db = await writeFile("./src/database/users.json", data);
      return db;
    } catch (error) {
      throw error;
    }
  }
}

export default UsersModel;

import { writeFile, readFile } from "jsonfile";

class AuthModel {
  static async read() {
    try {
      const db = await readFile("./src/database/auth.json");
      return db;
    } catch (error) {
      throw error;
    }
  }

  static async write(data) {
    try {
      const db = await writeFile("./src/database/auth.json", data);
      return db;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthModel;

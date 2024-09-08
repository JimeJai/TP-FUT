//servicio auth: validar q no exista el usuario y si existe rebotarlo, sino crearlo y guardarlo en el json,
// y le retorno algo al controller y ver si retorno token
//recibe req.body y datos, no recibe req res y next
//logica de negocio: aca van los metodos con la logica interna
import AuthModel from "../models/auth";
import UsersService from "./users";
import { v4 as uuidv4 } from "uuid";
import createHash from "../utils/create-hash";
import { validateRegisterUser, validateLoginUser } from "../schemas/users";

class AuthService {
  static async register(data: { name: string; email: string; pass: string }) {
    try {
      const { name, email, pass } = data;
      const result = validateRegisterUser(data); //llega un objeto
      if (!result.success) {
        const error = new Error("Datos de registro inválidos");
        error["statusCode"] = 400;

        throw error;
      }

      const userDb = await UsersService.read();
      const user = userDb.users.find((user) => user.email == data.email); //aca tiene q chequear q el email no este pero en la db de users
      if (user) {
        const error = new Error("Usuario existente");
        error["statusCode"] = 400;

        throw error;
      }
      const userId = await UsersService.create({ name, email }); //el create me devuelve un id y se guarda en userId :/

      const authDb = await AuthModel.read();
      const token = createHash(uuidv4());
      authDb.auth.push({
        id: uuidv4(),
        userId: userId,
        pass: createHash(pass),
        token: token,
      }); // aca no existen hash ni token
      AuthModel.write(authDb);
      return token;
      //en añlgun lado validar ese objeto
      //recibe name, email y contraseña, chequea q el email no este ya registrado, si no esta lo crea en la base de datos y le pone un id
      //para eso lee la base de datos con el authmodel(read), y le manda al modelo la data para reescribir (write) en la db
      // retorna token y crea el usuario en la db
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
      //aca va una validacion de q me mandaron email y pass? ccon un nuevo zod?
      const user = await UsersService.getByEmail(email); //encuentra usuario en bd de users con ese email
      const authDb = await AuthModel.read();
      const userAuthFound = authDb.auth.find((auth) => auth.userId == user.id); //busca en auth el idUser q sea igual al id del user de ese email
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

    //recibe email y contraseña, chequea si ese email concuerda con esa pass para eso tiene q tocar ambas basededatos
    //para eso lee la db del user(tiene el email) => llama al servicio del user q accede al model del user? de ahi saca el ID
    //y busca ese id en la db del auth y de ahi chequea q la pass enviada x parametro concuerde. (no se cuando va el userId)
    // si es match entonces le retorna token
  }

  static async logout(data) {
    try {
      //console.log(data.token);

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
// llamo al auth model y al user service tambien

import { z } from "zod";

const teams = z
  .object({
    name: z
      .string({
        required_error: "El nombre es requerido",
      })
      .min(2, { message: "El nombre debe tener más de 2 caracteres" })
      .max(15, { message: "El nombre debe tener menos de 15 caracteres" }),
    description: z
      .string({
        required_error: "La description es requerida",
      })
      .min(6, {
        message: "La descripcion debe tener un minimo de 6 caracteres",
      })
      .max(255, {
        message: "La descripcion debe tener un maximo de 255 caracteres",
      }),
  })
  .strict();
export function validateTeam(data) {
  return teams.safeParse(data);
}

const teamsUp = z
  .object({
    name: z
      .string({
        required_error: "El nombre es requerido",
      })
      .min(2, { message: "El nombre debe tener más de 2 caracteres" })
      .max(15, { message: "El nombre debe tener menos de 15 caracteres" })
      .optional(),
    description: z
      .string({
        required_error: "La description es requerida",
      })
      .min(6, {
        message: "La descripcion debe tener un minimo de 6 caracteres",
      })
      .max(255, {
        message: "La descripcion debe tener un maximo de 255 caracteres",
      })
      .optional(),
  })
  .strict();
export function validateTeamUp(data) {
  return teamsUp.safeParse(data);
}

import { z } from "zod";

const players = z
  .object({
    name: z
      .string({
        required_error: "El nombre es requerido",
      })
      .min(2, { message: "El nombre debe tener más de 2 caracteres" })
      .max(15, { message: "El nombre debe tener menos de 15 caracteres" }),
    position: z
      .string({
        required_error: "La posicion es requerida",
      })
      .min(6, {
        message: "La posicion debe tener un minimo de 6 caracteres",
      }),
    condition: z
      .string({ required_error: "La condicion es requerida" })
      .min(6, {
        message: "La condicion debe tener un minimo de 6 caracteres",
      }),
    numero: z.string({ required_error: "La camiseta es requerida" }).min(1, {
      message: "La camiseta debe tener un minimo de 1 caracter",
    }),
  })
  .strict();

export function validatePlayer(data) {
  return players.safeParse(data);
}
//--------------------------------------------------------

const playersUp = z.object({
  name: z
    .string({
      required_error: "El nombre es requerido",
    })
    .min(2, { message: "El nombre debe tener más de 2 caracteres" })
    .max(15, { message: "El nombre debe tener menos de 15 caracteres" })
    .optional(),

  position: z
    .string({
      required_error: "La posicion es requerida",
    })
    .min(6, {
      message: "La posicion debe tener un minimo de 6 caracteres",
    })
    .optional(),

  condition: z
    .string({ required_error: "La condicion es requerida" })
    .min(6, {
      message: "La condicion debe tener un minimo de 6 caracteres",
    })
    .optional(),

  numero: z
    .string({ required_error: "La camiseta es requerida" })
    .min(1, {
      message: "La camiseta debe tener un minimo de 1 caracter",
    })
    .optional(),
});

export function validatePlayerUp(data) {
  return playersUp.safeParse(data);
}

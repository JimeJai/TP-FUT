import { z } from "zod";

const registerUsers = z
  .object({
    name: z
      .string({
        required_error: "El nombre es requerido",
      })
      .min(2, { message: "El nombre debe tener más de 2 caracteres" })
      .max(50, { message: "El nombre debe tener menos de 50 caracteres" }),
    email: z
      .string({
        required_error: "El email es requerido",
      })
      .email("Debe enviar formato de email válido"),
    pass: z
      .string({
        required_error: "La contraseña es requerida",
      })
      .min(6, { message: "La contraseña debe tener un minimo de 6 caracteres" })
      .max(15, {
        message: "La contraseña debe tener un maximo de 15 caracteres",
      }),
  })
  .strict();

const loginUsers = z
  .object({
    email: z
      .string({
        required_error: "El email es requerido",
      })
      .email("Debe enviar formato de email válido"),
    pass: z
      .string({
        required_error: "La contraseña es requerida",
      })
      .min(6, { message: "La contraseña debe tener un minimo de 6 caracteres" })
      .max(15, {
        message: "La contraseña debe tener un maximo de 15 caracteres",
      }),
  })
  .strict();

export function validateRegisterUser(data) {
  return registerUsers.safeParse(data);
}

export function validateLoginUser(data) {
  return loginUsers.safeParse(data);
}

const updatedUsers = z.object({
  email: z
    .string({
      invalid_type_error: "Debe ser string",
    })
    .email("Debe enviar formato de email válido")
    .optional(),
  name: z.string({ invalid_type_error: "Debe ser string" }).optional(),
});

export function validateUpdatedUser(data) {
  return updatedUsers.safeParse(data);
}

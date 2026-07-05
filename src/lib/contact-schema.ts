import { z } from "astro/zod";

// Astro convierte los campos de FormData completamente vacíos a `null` antes de
// validar (ver formDataToObject/handleFormDataGet en astro/dist/actions/runtime).
// Normalizamos a cadena vacía primero para que el mensaje de error sea siempre
// el nuestro (ej. "mínimo 2 caracteres") y no el genérico de zod ("expected string").
const emptyToString = (val: unknown) => (val == null ? "" : val);

export const contactSchema = z.object({
  name: z.preprocess(
    emptyToString,
    z
      .string()
      .trim()
      .min(2, "El nombre debe tener al menos 2 caracteres.")
      .max(80, "El nombre no puede superar los 80 caracteres."),
  ),
  email: z.preprocess(
    emptyToString,
    z.string().trim().email("Introduce un email válido."),
  ),
  subject: z.preprocess(
    emptyToString,
    z
      .string()
      .trim()
      .min(2, "El asunto debe tener al menos 2 caracteres.")
      .max(150, "El asunto no puede superar los 150 caracteres."),
  ),
  message: z.preprocess(
    emptyToString,
    z
      .string()
      .trim()
      .min(10, "El mensaje debe tener al menos 10 caracteres.")
      .max(2000, "El mensaje no puede superar los 2000 caracteres."),
  ),
  // Sin restricción de longitud aquí a propósito: si el schema la rechazara,
  // Astro devolvería un ActionInputError (400) antes de llegar al handler,
  // delatando la trampa al bot. El handler decide en silencio qué hacer.
  botcheck: z.preprocess(emptyToString, z.string()),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = Exclude<keyof ContactInput, "botcheck">;

export const CONTACT_FIELDS: ContactField[] = [
  "name",
  "email",
  "subject",
  "message",
];

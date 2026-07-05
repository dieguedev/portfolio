import { defineAction, ActionError } from "astro:actions";
import { contactSchema } from "../lib/contact-schema";

export const server = {
  contact: defineAction({
    accept: "form",
    input: contactSchema,
    handler: async (input) => {
      if (input.botcheck && input.botcheck.length > 0) {
        return { success: true };
      }

      const accessKey = import.meta.env.WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "El servicio de contacto no está configurado correctamente.",
        });
      }

      let response: Response;
      try {
        response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: accessKey,
            name: input.name,
            email: input.email,
            replyto: input.email,
            subject: `[Portfolio] ${input.subject}`,
            message: input.message,
          }),
        });
      } catch {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            "No se pudo conectar con el servicio de envío. Inténtalo de nuevo más tarde.",
        });
      }

      let json: { success?: boolean; message?: string };
      try {
        json = await response.json();
      } catch {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Respuesta inesperada del servicio de envío.",
        });
      }

      if (!response.ok || !json.success) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            json.message ?? "No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.",
        });
      }

      return { success: true };
    },
  }),
};

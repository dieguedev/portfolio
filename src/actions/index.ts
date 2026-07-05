import { defineAction, ActionError } from "astro:actions";
import { contactSchema } from "../lib/contact-schema";
import { sendContactForm } from "../lib/web3forms-client";

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

      const result = await sendContactForm({
        accessKey,
        name: input.name,
        email: input.email,
        subject: `[Portfolio] ${input.subject}`,
        message: input.message,
      });

      if (!result.ok) {
        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: result.message,
        });
      }

      return { success: true };
    },
  }),
};

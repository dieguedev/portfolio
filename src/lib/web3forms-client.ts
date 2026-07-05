const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export type Web3FormsInput = {
  accessKey: string;
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type Web3FormsResult =
  | { ok: true }
  | {
      ok: false;
      reason: "network" | "invalid_response" | "rejected";
      message: string;
    };

type Web3FormsResponseBody = {
  success?: boolean;
  message?: string;
};

export async function sendContactForm(
  input: Web3FormsInput,
): Promise<Web3FormsResult> {
  let response: Response;
  try {
    response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: input.accessKey,
        name: input.name,
        email: input.email,
        replyto: input.email,
        subject: input.subject,
        message: input.message,
      }),
    });
  } catch {
    return {
      ok: false,
      reason: "network",
      message:
        "No se pudo conectar con el servicio de envío. Inténtalo de nuevo más tarde.",
    };
  }

  let json: Web3FormsResponseBody;
  try {
    json = await response.json();
  } catch {
    return {
      ok: false,
      reason: "invalid_response",
      message: "Respuesta inesperada del servicio de envío.",
    };
  }

  if (!response.ok || !json.success) {
    return {
      ok: false,
      reason: "rejected",
      message:
        json.message ??
        "No se pudo enviar el mensaje. Inténtalo de nuevo más tarde.",
    };
  }

  return { ok: true };
}

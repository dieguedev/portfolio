import {
  contactSchema,
  CONTACT_FIELDS,
  type ContactField,
} from "./contact-schema";
import { sendContactForm } from "./web3forms-client";

const CONTACT_EMAIL = "contacto@diegue.dev";

export function initContactForm(form: HTMLFormElement): () => void {
  const controller = new AbortController();
  const { signal } = controller;

  const submitBtn = form.querySelector<HTMLButtonElement>("#contact-submit");
  const status = form.querySelector<HTMLElement>("#form-status");
  const touched = new Set<ContactField>();

  const fieldEl = (name: ContactField) =>
    form.elements.namedItem(name) as
      HTMLInputElement | HTMLTextAreaElement | null;
  const errorEl = (name: ContactField) =>
    form.querySelector<HTMLElement>(`#field-${name}-error`);

  function validateField(name: ContactField): boolean {
    const el = fieldEl(name);
    const errEl = errorEl(name);
    if (!el || !errEl) return true;

    const parsed = contactSchema.shape[name].safeParse(el.value);
    if (parsed.success) {
      el.setAttribute("aria-invalid", "false");
      errEl.textContent = "";
      return true;
    }
    el.setAttribute("aria-invalid", "true");
    errEl.textContent = parsed.error.issues[0]?.message ?? "Campo inválido.";
    return false;
  }

  function resetStatus() {
    if (!status) return;
    status.textContent = "";
    status.removeAttribute("data-variant");
  }

  function showServerError() {
    if (!status) return;
    status.textContent =
      "Ha ocurrido un error, inténtalo de nuevo más tarde o escríbeme directamente a ";
    const link = document.createElement("a");
    link.href = `mailto:${CONTACT_EMAIL}`;
    link.className = "underline underline-offset-2";
    link.textContent = CONTACT_EMAIL;
    status.appendChild(link);
    status.appendChild(document.createTextNode("."));
    status.setAttribute("data-variant", "error");
  }

  function showSuccess() {
    if (status) {
      status.textContent = "¡Mensaje enviado! Te responderé lo antes posible.";
      status.setAttribute("data-variant", "success");
    }
    form.reset();
    touched.clear();
    CONTACT_FIELDS.forEach((name) => {
      fieldEl(name)?.setAttribute("aria-invalid", "false");
      const errEl = errorEl(name);
      if (errEl) errEl.textContent = "";
    });
  }

  CONTACT_FIELDS.forEach((name) => {
    const el = fieldEl(name);
    if (!el) return;

    el.addEventListener(
      "blur",
      () => {
        touched.add(name);
        validateField(name);
      },
      { signal },
    );

    el.addEventListener(
      "input",
      () => {
        if (touched.has(name)) validateField(name);
      },
      { signal },
    );
  });

  form.addEventListener(
    "submit",
    async (e) => {
      e.preventDefault();

      let firstInvalid: ContactField | null = null;
      let allValid = true;
      for (const name of CONTACT_FIELDS) {
        touched.add(name);
        if (!validateField(name)) {
          allValid = false;
          if (!firstInvalid) firstInvalid = name;
        }
      }

      if (!allValid) {
        if (firstInvalid) fieldEl(firstInvalid)?.focus();
        return;
      }

      resetStatus();

      const formData = new FormData(form);
      const botcheck = String(formData.get("botcheck") ?? "");

      if (botcheck.length > 0) {
        showSuccess();
        return;
      }

      submitBtn?.setAttribute("disabled", "true");
      if (submitBtn) submitBtn.textContent = "Enviando...";

      const subject = String(formData.get("subject") ?? "");
      const result = await sendContactForm({
        accessKey: import.meta.env.PUBLIC_WEB3FORMS_ACCESS_KEY,
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        subject: `[Portfolio] ${subject}`,
        message: String(formData.get("message") ?? ""),
      });

      submitBtn?.removeAttribute("disabled");
      if (submitBtn) submitBtn.textContent = "Enviar mensaje";

      if (!result.ok) {
        showServerError();
        return;
      }

      showSuccess();
    },
    { signal },
  );

  return () => controller.abort();
}

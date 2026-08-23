import { Envelope } from "@boxicons/react/Envelope";
import { Linkedin } from "@boxicons/react/Linkedin";
import { Whatsapp } from "@boxicons/react/Whatsapp";

const CONTACT_EMAIL = "contacto@diegue.dev";

export default function Contact() {
  const whatsappText = encodeURIComponent(
    "Hola! He visto tu portfolio y me encantaría solicitar más información.",
  );
  const whatsappHref = `https://wa.me/34614914550?text=${whatsappText}`;

  return (
    <section
      id="contact"
      className="scroll-mt-28 mx-auto max-w-[920px] px-6 pb-12 pt-14 sm:pb-20 sm:pt-24"
      aria-labelledby="contact-title"
    >
      <div className="mb-12 md:mb-16">
        <h2 className="eyebrow mb-5">Contacto</h2>
        <p
          id="contact-title"
          className="text-[clamp(3rem,12vw,7rem)] font-semibold leading-[0.88] text-white"
        >
          <span className="text-accent">Hablemos</span>
        </p>
        <p className="mt-6 max-w-lg text-base leading-7 text-white/70 sm:text-[1.05rem] sm:leading-8">
          Elige el canal que prefieras y hablamos.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <a href={`mailto:${CONTACT_EMAIL}`} className="button-glass w-full">
          <Envelope width={22} height={22} fill="currentColor" aria-hidden="true" />
          {CONTACT_EMAIL}
        </a>
        <a
          href="https://linkedin.com/in/diego-bogo/"
          target="_blank"
          rel="noopener noreferrer"
          className="button-glass w-full"
        >
          <Linkedin width={22} height={22} fill="currentColor" aria-hidden="true" />
          LinkedIn
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="button-glass w-full"
        >
          <Whatsapp width={22} height={22} fill="currentColor" aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </section>
  );
}

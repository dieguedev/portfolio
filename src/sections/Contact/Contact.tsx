import { Envelope } from "@boxicons/react/Envelope";
import { Linkedin } from "@boxicons/react/Linkedin";
import { Whatsapp } from "@boxicons/react/Whatsapp";
import Link from "@/components/ui/Link/Link";
import Text from "@/components/ui/Text/Text";
import styles from "./Contact.module.scss";

const CONTACT_EMAIL = "contacto@diegue.dev";

export default function Contact() {
  const whatsappText = encodeURIComponent(
    "Hola! He visto tu portfolio y me encantaría solicitar más información.",
  );
  const whatsappHref = `https://wa.me/34614914550?text=${whatsappText}`;

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.intro}>
        <Text as="h2" variant="eyebrow" className={styles.eyebrowHeading}>
          Contacto
        </Text>
        <Text as="p" variant="title" id="contact-title">
          <Text as="span" variant="accent">
            Hablemos
          </Text>
        </Text>
        <Text as="p" variant="body" className={styles.subtitle}>
          Elige el canal que prefieras y hablamos.
        </Text>
      </div>

      <div className={styles.ctaGrid}>
        <Link href={`mailto:${CONTACT_EMAIL}`} variant="glass" fullWidth>
          <Envelope width={22} height={22} fill="currentColor" aria-hidden="true" />
          {CONTACT_EMAIL}
        </Link>
        <Link
          href="https://linkedin.com/in/diego-bogo/"
          target="_blank"
          rel="noopener noreferrer"
          variant="glass"
          fullWidth
        >
          <Linkedin width={22} height={22} fill="currentColor" aria-hidden="true" />
          LinkedIn
        </Link>
        <Link
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          variant="glass"
          fullWidth
        >
          <Whatsapp width={22} height={22} fill="currentColor" aria-hidden="true" />
          WhatsApp
        </Link>
      </div>
    </section>
  );
}

import { Linkedin } from "@boxicons/react/Linkedin";

export default function CtaBanner() {
  return (
    <div
      className="border-t border-white/[0.08] px-6 py-24 text-center"
      style={{
        background:
          "radial-gradient(ellipse 100% 80% at 50% 0%, rgba(255,255,255,0.13) 0%, transparent 100%)",
      }}
    >
      <div className="mx-auto max-w-[920px]">
        <p className="eyebrow mb-2 tracking-[0.14em] text-white/40 md:mb-0 md:tracking-[0.28em]">
          No lo pienses más
        </p>
        <h2 className="mb-5 text-[clamp(2.5rem,8vw,5rem)] font-semibold font-display leading-[0.92] text-white">
          ¿Listo para empezar?
        </h2>
        <p className="mx-auto mb-10 max-w-sm text-base leading-7 text-white/55">
          Hagamos que tu web deje de parecer una plantilla.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="#contact" className="button">
            Contactar
          </a>
          <a
            href="https://linkedin.com/in/diego-bogo/"
            className="button-glass"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size="sm" />
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}

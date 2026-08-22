import type { Metadata } from "next";
import Link from "next/link";
import TechMarquee from "@/components/TechMarquee";
import starIcon from "@/assets/star.svg";
import {
  TypescriptIcon,
  _React,
  NextjsIcon,
  TailwindIcon,
  SupabaseIcon,
  ReactQueryIcon,
  Jest,
  CypressIcon,
  TestingLibrary,
  AstroIcon,
} from "@dev.icons/react/mono";
import { Linkedin } from "@boxicons/react/Linkedin";

export const metadata: Metadata = {
  title: "Diegue | Acerca de",
};

const experiencia = [
  { role: "Front-end Developer", company: "JAKALA Iberia", period: "Ene. 24 — hoy." },
  { role: "Front-end Developer", company: "Biko", period: "Jul. 23 — Ene. 24." },
  { role: "Developer Trainee", company: "Biko", period: "Mar. 23 — Jul. 23." },
];

const iconProps = { size: 52, color: "currentColor", "aria-hidden": "true" } as const;

const tecnologias = [
  { name: "TypeScript", icon: <TypescriptIcon {...iconProps} /> },
  { name: "React", icon: <_React {...iconProps} /> },
  { name: "Next.js", icon: <NextjsIcon {...iconProps} /> },
  { name: "Tailwind", icon: <TailwindIcon {...iconProps} /> },
  { name: "Supabase", icon: <SupabaseIcon {...iconProps} /> },
  { name: "TanStack Query", icon: <ReactQueryIcon {...iconProps} /> },
  { name: "Jest", icon: <Jest {...iconProps} /> },
  { name: "Cypress", icon: <CypressIcon {...iconProps} /> },
  { name: "Testing Library", icon: <TestingLibrary {...iconProps} /> },
  { name: "Astro", icon: <AstroIcon {...iconProps} /> },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-[920px] px-6 pb-16 pt-40" aria-labelledby="about-title">
        <div className="mb-8 md:mb-12">
          <h1 className="eyebrow mb-5">Acerca de</h1>
          <p
            id="about-title"
            className="text-[clamp(3rem,12vw,7rem)] font-semibold leading-[0.88] tracking-normal text-white"
          >
            <span className="text-accent">diegue</span>
          </p>
        </div>

        <blockquote className="mb-16 border-l-[3px] border-l-white/40 pl-6">
          <p className="text-base leading-7 text-white/80 sm:text-[1.05rem] sm:leading-8">
            Desarrollador web en <strong className="font-semibold text-white">Pamplona</strong>{" "}
            especializado en React y TypeScript. Creo experiencias web rápidas, accesibles y bien
            diseñadas para{" "}
            <strong className="font-semibold text-white">empresas, startups y profesionales</strong>{" "}
            que buscan una <strong className="font-semibold text-white">presencia digital sólida.</strong>
          </p>
        </blockquote>

        <TechMarquee tecnologias={tecnologias} />
      </section>

      <section className="mx-auto max-w-[920px] px-6 pb-20 pt-4" aria-label="Experiencia">
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/[0.15]" />

          {experiencia.map((job, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={job.company + job.period}
                className="grid grid-cols-[1fr_40px_1fr] items-center py-10 md:grid-cols-[1fr_80px_1fr] md:py-14"
              >
                <div className={isLeft ? "col-start-1 pr-4 text-right md:pr-10" : "col-start-3 pl-4 md:pl-10"}>
                  <p className="mb-1 text-xs tabular-nums text-white/40">{job.period}</p>
                  <p className="text-sm font-bold leading-tight text-white md:text-lg">{job.role}</p>
                  <p className="mt-0.5 text-xs text-white/55 md:text-sm">{job.company}</p>
                </div>
                <div className="col-start-2 relative z-10 flex justify-center">
                  <img src={starIcon.src} className="h-auto w-7 md:w-12" alt="" aria-hidden="true" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

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
            <Link href="/contact" className="button">
              Contactar
            </Link>
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
    </>
  );
}

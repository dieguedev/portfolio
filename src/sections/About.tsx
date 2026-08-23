import { Code } from "@boxicons/react/Code";
import { Palette } from "@boxicons/react/Palette";
import { RocketAlt } from "@boxicons/react/RocketAlt";
import starIcon from "@/assets/star.svg";
import CardCarousel from "@/components/ui/CardCarousel";
import SkillCard from "@/components/ui/SkillCard";

const iconProps = {
  size: "md",
  color: "currentColor",
  "aria-hidden": "true",
} as const;

const skills = [
  { icon: <Code {...iconProps} />, title: "Código limpio" },
  { icon: <Palette {...iconProps} />, title: "Diseño cuidado" },
  { icon: <RocketAlt {...iconProps} />, title: "Rendimiento" },
];

const experiencia = [
  {
    role: "Front-end Developer",
    company: "JAKALA Iberia",
    period: "Ene. 24 — hoy.",
  },
  {
    role: "Front-end Developer",
    company: "Biko",
    period: "Jul. 23 — Ene. 24.",
  },
  { role: "Developer Trainee", company: "Biko", period: "Mar. 23 — Jul. 23." },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-28" aria-labelledby="about-title">
      <div className="mx-auto max-w-[920px] px-6 pb-16 pt-24">
        <div className="mb-8 md:mb-12">
          <h2 className="eyebrow mb-5">Acerca de</h2>
          <p
            id="about-title"
            className="text-[clamp(3rem,12vw,7rem)] font-semibold leading-[0.88] tracking-normal text-white"
          >
            <span className="text-accent">diegue</span>
          </p>
        </div>

        <blockquote className="mb-16 border-l-[3px] border-l-white/40 pl-6">
          <p className="text-base leading-7 text-white/80 sm:text-[1.05rem] sm:leading-8">
            Desarrollador web en{" "}
            <strong className="font-semibold text-white">Pamplona</strong>{" "}
            especializado en React y TypeScript. Creo experiencias web rápidas,
            accesibles y bien diseñadas para{" "}
            <strong className="font-semibold text-white">
              empresas, startups y profesionales
            </strong>{" "}
            que buscan una{" "}
            <strong className="font-semibold text-white">
              presencia digital sólida.
            </strong>
          </p>
        </blockquote>
      </div>

      <div
        className="mx-auto max-w-[920px] px-6 pb-24"
        aria-label="Puntos fuertes"
      >
        <CardCarousel>
          {skills.map((skill) => (
            <div
              key={skill.title}
              className="shrink-0 basis-[calc((100%-40px)/2.5)] min-w-[240px]"
            >
              <SkillCard {...skill} />
            </div>
          ))}
        </CardCarousel>
      </div>

      <div
        className="mx-auto max-w-[920px] px-6 pb-20 pt-4"
        aria-label="Experiencia"
      >
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-white/[0.15]" />

          {experiencia.map((job, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={job.company + job.period}
                className="grid grid-cols-[1fr_40px_1fr] items-center py-10 md:grid-cols-[1fr_80px_1fr] md:py-14"
              >
                <div
                  className={
                    isLeft
                      ? "col-start-1 pr-4 text-right md:pr-10"
                      : "col-start-3 pl-4 md:pl-10"
                  }
                >
                  <p className="mb-1 text-xs tabular-nums text-white/40">
                    {job.period}
                  </p>
                  <p className="text-sm font-bold leading-tight text-white md:text-lg">
                    {job.role}
                  </p>
                  <p className="mt-0.5 text-xs text-white/55 md:text-sm">
                    {job.company}
                  </p>
                </div>
                <div className="col-start-2 relative z-10 flex justify-center">
                  <img
                    src={starIcon.src}
                    className="h-auto w-7 md:w-12"
                    alt=""
                    aria-hidden="true"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { Code } from "@boxicons/react/Code";
import { Devices } from "@boxicons/react/Devices";
import { EditAlt } from "@boxicons/react/EditAlt";
import { Lock } from "@boxicons/react/Lock";
import { Palette } from "@boxicons/react/Palette";
import { RocketAlt } from "@boxicons/react/RocketAlt";
import cftLogo from "@/assets/cft.png";
import lkLogo from "@/assets/lk.png";
import starIcon from "@/assets/star.svg";
import Carousel from "@/components/ui/Carousel/Carousel";
import styles from "./About.module.scss";
import SkillCard from "./components/SkillCard/SkillCard";

const iconProps = {
  size: "md",
  color: "currentColor",
  "aria-hidden": "true",
} as const;

const skills = [
  { icon: <Palette {...iconProps} />, title: "Diseño a medida" },
  { icon: <Devices {...iconProps} />, title: "Multidispositivo" },
  { icon: <EditAlt {...iconProps} />, title: "Gestión sencilla" },
  { icon: <RocketAlt {...iconProps} />, title: "Buen rendimiento" },
  { icon: <Lock {...iconProps} />, title: "Web segura" },
  { icon: <Code {...iconProps} />, title: "Código escalable" },
];

const clientes = [
  { name: "Crypto Fund Trader", logo: cftLogo },
  { name: "LK", logo: lkLogo },
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
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={styles.intro}>
        <div className={styles.introHeading}>
          <h2 className={styles.eyebrowHeading}>Acerca de</h2>
          <p id="about-title" className={styles.title}>
            <span className={styles.accent}>diegue</span>
          </p>
        </div>

        <blockquote className={styles.quote}>
          <p className={styles.quoteText}>
            Desarrollador web en{" "}
            <strong className={styles.strongText}>Pamplona</strong>{" "}
            especializado en React y TypeScript. Creo experiencias web rápidas,
            accesibles y bien diseñadas para{" "}
            <strong className={styles.strongText}>
              empresas, startups y profesionales
            </strong>{" "}
            que buscan una{" "}
            <strong className={styles.strongText}>
              presencia digital sólida.
            </strong>
          </p>
        </blockquote>
      </div>

      <div className={styles.skillsSection} aria-labelledby="skills-title">
        <h3 id="skills-title" className={styles.skillsHeading}>
          Cada detalle, cubierto
        </h3>
        <Carousel>
          {skills.map((skill) => (
            <div key={skill.title} className={styles.skillItem}>
              <SkillCard {...skill} />
            </div>
          ))}
        </Carousel>
      </div>

      <div className={styles.experienciaSection} aria-labelledby="experiencia-title">
        <h3 id="experiencia-title" className={styles.experienciaHeading}>
          Experiencia
        </h3>
        <div className={styles.timeline}>
          <div className={styles.timelineLine} />

          {experiencia.map((job, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={job.company + job.period} className={styles.row}>
                <div
                  className={isLeft ? styles.rowContentLeft : styles.rowContentRight}
                >
                  <p className={styles.period}>{job.period}</p>
                  <p className={styles.role}>{job.role}</p>
                  <p className={styles.company}>{job.company}</p>
                </div>
                <div className={styles.starIconWrap}>
                  <img
                    src={starIcon.src}
                    className={styles.starIcon}
                    alt=""
                    aria-hidden="true"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.clientesSection} aria-labelledby="clientes-title">
        <h3 id="clientes-title" className={styles.clientesHeading}>
          Clientes destacados
        </h3>
        <div className={styles.clientesRow}>
          {clientes.map((cliente) => (
            <img
              key={cliente.name}
              src={cliente.logo.src}
              alt={cliente.name}
              className={styles.clienteLogo}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

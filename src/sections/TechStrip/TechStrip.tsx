import Text from "@/components/ui/Text/Text";
import Marquee from "@/components/ui/Marquee/Marquee";
import styles from "./TechStrip.module.scss";
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

const iconProps = {
  size: 52,
  color: "currentColor",
  "aria-hidden": "true",
} as const;

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

const items = tecnologias.map((tech) => ({
  key: tech.name,
  content: (
    <>
      <div className={styles.iconWrap}>{tech.icon}</div>
      <Text as="span" variant="eyebrow" className={styles.techName}>
        {tech.name}
      </Text>
    </>
  ),
}));

export default function TechStrip() {
  return (
    <section className={styles.section} aria-label="Tecnologías">
      <Marquee items={items} ariaLabel="Listado de tecnologías" />
    </section>
  );
}

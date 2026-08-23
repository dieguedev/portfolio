import TechMarquee from "@/components/TechMarquee";
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

export default function TechStrip() {
  return (
    <section
      className="border-y border-white/[0.08] bg-white/[0.03] py-4 sm:py-4"
      aria-label="Tecnologías"
    >
      <TechMarquee tecnologias={tecnologias} />
    </section>
  );
}

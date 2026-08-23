import type { ReactNode } from "react";

interface Tech {
  name: string;
  icon: ReactNode;
}

interface TechMarqueeProps {
  tecnologias: Tech[];
}

export default function TechMarquee({ tecnologias }: TechMarqueeProps) {
  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <ul
        className="flex w-max items-start motion-safe:[animation:marquee_10.5s_linear_infinite] sm:motion-safe:[animation:marquee_13s_linear_infinite]"
        aria-label="Listado de tecnologías"
      >
        {[...tecnologias, ...tecnologias].map((tech, i) => (
          <li
            key={`${tech.name}-${i}`}
            className="mr-6 flex h-20 w-28 shrink-0 flex-col items-center justify-center gap-1.5 text-center sm:mr-10 sm:h-32 sm:w-32 sm:gap-3"
            aria-hidden={i >= tecnologias.length ? "true" : undefined}
          >
            <div className="[&>svg]:h-[26px] [&>svg]:w-[26px] sm:[&>svg]:h-[52px] sm:[&>svg]:w-[52px]">
              {tech.icon}
            </div>
            <span className="eyebrow w-full">{tech.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

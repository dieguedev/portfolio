import type { CSSProperties, ReactNode } from "react";
import ditherPattern from "@/assets/dither-smoke.png";
import pearlMetal from "@/assets/pearl-metal.png";

interface SkillCardProps {
  icon: ReactNode;
  title: string;
}

export default function SkillCard({ icon, title }: SkillCardProps) {
  const surfaceStyle = {
    "--skill-card-pattern": `url(${ditherPattern.src})`,
    "--skill-card-texture": `url(${pearlMetal.src})`,
  } as CSSProperties;

  return (
    <div
      className="skill-card-surface @container relative aspect-[2/1] overflow-hidden rounded-2xl p-[clamp(0.75rem,5cqw,1.5rem)]"
      style={surfaceStyle}
    >
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
        <div className="mb-[clamp(0.25rem,2cqw,0.5rem)] text-black/85" aria-hidden="true">
          {icon}
        </div>
        <h3 className="text-[clamp(0.9rem,5.5cqw,1.125rem)] font-bold text-black/85">
          {title}
        </h3>
      </div>
    </div>
  );
}

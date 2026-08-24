import type { ReactNode } from "react";

interface MarqueeItem {
  key: string;
  content: ReactNode;
}

interface MarqueeProps {
  items: MarqueeItem[];
  ariaLabel: string;
}

const REPEAT_COUNT = 6;

export default function Marquee({ items, ariaLabel }: MarqueeProps) {
  const repeated = Array.from({ length: REPEAT_COUNT }, () => items).flat();

  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <ul
        className="flex w-max items-start motion-safe:[animation:marquee_10.5s_linear_infinite] sm:motion-safe:[animation:marquee_13s_linear_infinite]"
        aria-label={ariaLabel}
      >
        {repeated.map((item, i) => (
          <li
            key={`${item.key}-${i}`}
            className="mr-6 flex h-20 w-28 shrink-0 flex-col items-center justify-center gap-1.5 text-center sm:mr-10 sm:h-32 sm:w-32 sm:gap-3"
            aria-hidden={i >= items.length ? "true" : undefined}
          >
            {item.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

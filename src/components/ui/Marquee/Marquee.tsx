import type { ReactNode } from "react";
import styles from "./Marquee.module.scss";

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
    <div className={styles.wrapper}>
      <ul className={styles.track} aria-label={ariaLabel}>
        {repeated.map((item, i) => (
          <li
            key={`${item.key}-${i}`}
            className={styles.item}
            aria-hidden={i >= items.length ? "true" : undefined}
          >
            {item.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

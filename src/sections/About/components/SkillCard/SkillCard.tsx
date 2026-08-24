import type { ReactNode } from "react";
import styles from "./SkillCard.module.scss";

interface SkillCardProps {
  icon: ReactNode;
  title: string;
}

export default function SkillCard({ icon, title }: SkillCardProps) {
  return (
    <div className={styles.surface}>
      <div className={styles.content}>
        <div className={styles.iconWrap} aria-hidden="true">
          {icon}
        </div>
        <h3 className={styles.title}>{title}</h3>
      </div>
    </div>
  );
}

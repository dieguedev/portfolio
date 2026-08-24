import type { CSSProperties } from "react";
import styles from "./Loader.module.scss";

interface LoaderProps {
  spinningIcon: string;
  centerIcon: string;
  size?: number;
  rotationDuration?: number;
}

export default function Loader({
  spinningIcon,
  centerIcon,
  size = 128,
  rotationDuration = 10,
}: LoaderProps) {
  const style = {
    "--loader-size": `${size}px`,
    "--loader-duration": `${rotationDuration}s`,
  } as CSSProperties;

  return (
    <div className={styles.loader} style={style} aria-hidden="true">
      <img className={styles.spin} src={spinningIcon} alt="" />
      <img className={styles.center} src={centerIcon} alt="" />
    </div>
  );
}

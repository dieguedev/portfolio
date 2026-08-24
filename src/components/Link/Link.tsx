import type { ComponentPropsWithoutRef } from "react";
import { concatClasses } from "@/lib/concatClasses";
import styles from "./Link.module.scss";

interface LinkProps extends Omit<ComponentPropsWithoutRef<"a">, "href"> {
  href: string;
  variant?: "solid" | "glass";
  fullWidth?: boolean;
}

export default function Link({
  href,
  variant,
  fullWidth,
  className,
  children,
  ...rest
}: LinkProps) {
  const classes = concatClasses([
    variant && styles[variant],
    fullWidth && styles.fullWidth,
    className,
  ]);

  return (
    <a href={href} className={classes || undefined} {...rest}>
      {children}
    </a>
  );
}

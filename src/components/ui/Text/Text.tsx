import { createElement, type ComponentPropsWithoutRef } from "react";
import { concatClasses } from "@/lib/concatClasses";
import styles from "./Text.module.scss";

type TextVariant = "eyebrow" | "accent" | "title" | "subtitle" | "body";
type TextElement = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "strong" | "li";

interface TextProps extends ComponentPropsWithoutRef<"p"> {
  as?: TextElement;
  variant?: TextVariant;
  bold?: boolean;
}

export default function Text({
  as = "p",
  variant,
  bold,
  className,
  children,
  ...rest
}: TextProps) {
  const classes = concatClasses([
    variant && styles[variant],
    bold && styles.bold,
    className,
  ]);

  return createElement(as, { className: classes || undefined, ...rest }, children);
}

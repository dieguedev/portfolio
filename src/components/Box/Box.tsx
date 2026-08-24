import type { ComponentPropsWithoutRef } from "react";
import { concatClasses } from "@/lib/concatClasses";
import styles from "./Box.module.scss";

type BoxDirection = "row" | "column";
type SpacingToken = "xtiny" | "tiny" | "small" | "medium" | "large" | "xlarge";
type BoxAlign = "start" | "center" | "end" | "stretch" | "baseline";
type BoxJustify = "start" | "center" | "end" | "between" | "around" | "evenly";

interface BoxProps extends ComponentPropsWithoutRef<"div"> {
  direction?: BoxDirection;
  gap?: SpacingToken;
  align?: BoxAlign;
  justify?: BoxJustify;
  wrap?: boolean;
}

const gapClassNames: Record<SpacingToken, string> = {
  xtiny: styles.gapXtiny,
  tiny: styles.gapTiny,
  small: styles.gapSmall,
  medium: styles.gapMedium,
  large: styles.gapLarge,
  xlarge: styles.gapXlarge,
};

const alignClassNames: Record<BoxAlign, string> = {
  start: styles.alignStart,
  center: styles.alignCenter,
  end: styles.alignEnd,
  stretch: styles.alignStretch,
  baseline: styles.alignBaseline,
};

const justifyClassNames: Record<BoxJustify, string> = {
  start: styles.justifyStart,
  center: styles.justifyCenter,
  end: styles.justifyEnd,
  between: styles.justifyBetween,
  around: styles.justifyAround,
  evenly: styles.justifyEvenly,
};

export default function Box({
  direction = "column",
  gap,
  align,
  justify,
  wrap,
  className,
  children,
  ...rest
}: BoxProps) {
  const classes = concatClasses([
    styles.box,
    direction === "row" ? styles.row : styles.column,
    gap && gapClassNames[gap],
    align && alignClassNames[align],
    justify && justifyClassNames[justify],
    wrap && styles.wrap,
    className,
  ]);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}

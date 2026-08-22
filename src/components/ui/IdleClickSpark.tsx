"use client";

import dynamic from "next/dynamic";
import { useIdleMount } from "@/lib/useIdleMount";
import type { ComponentProps } from "react";
import type ClickSparkComponent from "./ClickSpark";

const ClickSpark = dynamic(() => import("./ClickSpark"), { ssr: false });

export default function IdleClickSpark(
  props: ComponentProps<typeof ClickSparkComponent>,
) {
  const ready = useIdleMount();
  if (!ready) return null;
  return <ClickSpark {...props} />;
}

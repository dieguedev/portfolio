"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ComponentType } from "react";

function useIdleMount() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setReady(true));
      return () => window.cancelIdleCallback(id);
    }

    const id = window.setTimeout(() => setReady(true), 1);
    return () => window.clearTimeout(id);
  }, []);

  return ready;
}

export function idleComponent<P extends object>(
  loader: () => Promise<{ default: ComponentType<P> }>,
) {
  const Component = dynamic(loader, { ssr: false });
  return function Idle(props: P) {
    const ready = useIdleMount();
    return ready ? <Component {...props} /> : null;
  };
}

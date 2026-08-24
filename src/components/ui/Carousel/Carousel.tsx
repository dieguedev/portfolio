"use client";

import { ChevronLeft } from "@boxicons/react/ChevronLeft";
import { ChevronRight } from "@boxicons/react/ChevronRight";
import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./Carousel.module.scss";

interface CarouselProps {
  children: ReactNode;
}

export default function Carousel({ children }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const updateState = () => {
      setCanScrollLeft(el.scrollLeft > 4);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };

    updateState();
    el.addEventListener("scroll", updateState, { passive: true });
    const resizeObserver = new ResizeObserver(updateState);
    resizeObserver.observe(el);
    return () => {
      el.removeEventListener("scroll", updateState);
      resizeObserver.disconnect();
    };
  }, []);

  const scrollByCards = (direction: 1 | -1) => {
    const el = scrollRef.current;
    const firstCard = el?.firstElementChild as HTMLElement | null;
    if (!el || !firstCard) return;

    const gap = parseFloat(getComputedStyle(el).columnGap || "0");
    const cardStep = firstCard.getBoundingClientRect().width + gap;
    const visibleCards = Math.max(1, Math.floor(el.clientWidth / cardStep));
    const maxScroll = el.scrollWidth - el.clientWidth;
    const target = Math.min(
      Math.max(el.scrollLeft + direction * visibleCards * cardStep, 0),
      maxScroll,
    );
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  return (
    <div>
      <div className={styles.controls}>
        <button
          type="button"
          aria-label="Anterior"
          disabled={!canScrollLeft}
          suppressHydrationWarning
          onClick={() => scrollByCards(-1)}
          className={styles.button}
        >
          <ChevronLeft size="sm" />
        </button>
        <button
          type="button"
          aria-label="Siguiente"
          disabled={!canScrollRight}
          suppressHydrationWarning
          onClick={() => scrollByCards(1)}
          className={styles.button}
        >
          <ChevronRight size="sm" />
        </button>
      </div>

      <div ref={scrollRef} className={styles.track}>
        {children}
      </div>
    </div>
  );
}

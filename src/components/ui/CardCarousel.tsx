"use client";

import { ChevronLeft } from "@boxicons/react/ChevronLeft";
import { ChevronRight } from "@boxicons/react/ChevronRight";
import { useEffect, useRef, useState, type ReactNode } from "react";

interface CardCarouselProps {
  children: ReactNode;
}

export default function CardCarousel({ children }: CardCarouselProps) {
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
      <div className="mb-4 flex justify-end gap-2">
        <button
          type="button"
          aria-label="Anterior"
          disabled={!canScrollLeft}
          suppressHydrationWarning
          onClick={() => scrollByCards(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/40"
        >
          <ChevronLeft size="sm" />
        </button>
        <button
          type="button"
          aria-label="Siguiente"
          disabled={!canScrollRight}
          suppressHydrationWarning
          onClick={() => scrollByCards(1)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black disabled:cursor-not-allowed disabled:bg-white/20 disabled:text-white/40"
        >
          <ChevronRight size="sm" />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
}

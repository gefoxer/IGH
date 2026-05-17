"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameCarouselProps {
  children: React.ReactNode;
  className?: string;
}

export function GameCarousel({ children, className }: GameCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const overflow = maxScroll > 8;
    setHasOverflow(overflow);

    if (!overflow) {
      setProgress(0);
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    setProgress(el.scrollLeft / maxScroll);
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < maxScroll - 8);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(el);
    return () => observer.disconnect();
  }, [updateScrollState, children]);

  const scrollByCards = (direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(":scope > *");
    const step = card ? card.offsetWidth + 12 : 280;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  const handleSliderChange = (value: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    el.scrollLeft = (value / 100) * maxScroll;
  };

  return (
    <div className={cn("relative", className)}>
      {hasOverflow && (
        <>
          <div
            className={cn(
              "pointer-events-none absolute left-0 top-0 z-10 h-[calc(100%-2.75rem)] w-10 bg-gradient-to-r from-background to-transparent transition-opacity sm:w-14",
              canScrollLeft ? "opacity-100" : "opacity-0"
            )}
            aria-hidden
          />
          <div
            className={cn(
              "pointer-events-none absolute right-0 top-0 z-10 h-[calc(100%-2.75rem)] w-10 bg-gradient-to-l from-background to-transparent transition-opacity sm:w-14",
              canScrollRight ? "opacity-100" : "opacity-0"
            )}
            aria-hidden
          />
          <button
            type="button"
            onClick={() => scrollByCards(-1)}
            disabled={!canScrollLeft}
            aria-label="Прокрутить назад"
            className={cn(
              "absolute left-0 top-[42%] z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-card/95 text-foreground shadow-lg backdrop-blur-sm transition-all hover:border-accent/50 hover:text-accent disabled:pointer-events-none disabled:opacity-0 sm:left-1",
              canScrollLeft && "opacity-100"
            )}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(1)}
            disabled={!canScrollRight}
            aria-label="Прокрутить вперёд"
            className={cn(
              "absolute right-0 top-[42%] z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-card/95 text-foreground shadow-lg backdrop-blur-sm transition-all hover:border-accent/50 hover:text-accent disabled:pointer-events-none disabled:opacity-0 sm:right-1",
              canScrollRight && "opacity-100"
            )}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      <div
        ref={scrollRef}
        onScroll={updateScrollState}
        className="game-carousel-track -mx-1 flex gap-3 overflow-x-auto overflow-y-hidden px-1 pb-1 scroll-smooth snap-x snap-mandatory"
      >
        {children}
      </div>

      {hasOverflow && (
        <div className="mt-4">
          <input
            type="range"
            min={0}
            max={100}
            step={0.1}
            value={progress * 100}
            onChange={(e) => handleSliderChange(Number(e.target.value))}
            aria-label="Прокрутка карточек"
            className="game-carousel-slider w-full"
            style={{ "--slider-progress": `${progress * 100}%` } as React.CSSProperties}
          />
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function ScreenshotGallery({ screenshots }: { screenshots: string[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-4">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-white/5">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={screenshots[active]}
              alt={`Screenshot ${active + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 900px"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
        {screenshots.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "relative h-16 w-28 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
              active === i ? "border-accent" : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <Image src={src} alt="" fill className="object-cover" sizes="112px" />
          </button>
        ))}
      </div>
    </div>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedPlaceholderProps {
  items: readonly string[];
  paused?: boolean;
}

export function AnimatedPlaceholder({
  items,
  paused = false,
}: AnimatedPlaceholderProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (paused) return;

    // Keep the first message visible longer.
    const initialDelay =
      index === 0 ? 5000 : 3500;

    const timeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, initialDelay);

    return () => clearTimeout(timeout);
  }, [index, paused, items.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={items[index]}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{
          duration: 0.25,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
          text-xl
          text-zinc-500
        "
      >
        {items[index]}
      </motion.span>
    </AnimatePresence>
  );
}
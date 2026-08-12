"use client";

import { motion } from "framer-motion";

import { BrandMark } from "@/components/shared/BrandMark";
import {
  INVESTIGATION_MESSAGES,
  type InvestigationStage,
} from "@/constants/investigation";

interface InvestigationTransitionProps {
  stage: InvestigationStage;
  query: string;
}

export function InvestigationTransition({
  stage,
  query,
}: InvestigationTransitionProps) {
  const message = INVESTIGATION_MESSAGES[stage];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="flex w-full max-w-xl flex-col items-center px-6 text-center">
        {/* Mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-12"
        >
          <BrandMark
            className="h-14 w-14 text-zinc-300"
            stage={stage}
          />
        </motion.div>

        {/* Query */}
        <motion.p
          key={query}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl text-2xl font-medium tracking-tight text-zinc-200"
        >
          {query}
        </motion.p>

        {/* Current action */}
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.35,
            ease: "easeOut",
          }}
          className="mt-4 flex items-center gap-3"
        >
          <span className="h-1 w-1 rounded-full bg-[var(--accent)]" />

          <span className="text-sm tracking-wide text-zinc-500">
            {message}
          </span>
        </motion.div>

        {/* Signal */}
        <div className="relative mt-8 h-px w-48 overflow-hidden bg-zinc-900">
          <motion.div
            className="absolute inset-y-0 w-16 bg-zinc-600"
            animate={{
              x: ["-4rem", "12rem"],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
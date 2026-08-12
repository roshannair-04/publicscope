"use client";

import { motion } from "framer-motion";

import type { InvestigationStage } from "@/constants/investigation";

interface BrandMarkProps {
  className?: string;
  active?: boolean;
  stage?: InvestigationStage;
}

export function BrandMark({
  className = "",
  active = false,
  stage,
}: BrandMarkProps) {
  const isInvestigation = stage !== undefined;

  const convergence =
    stage === "extracting" ||
    stage === "connecting" ||
    stage === "building" ||
    stage === "ready";

  const finalAlignment =
    stage === "building" || stage === "ready";

  return (
    <svg
      viewBox="0 0 240 240"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="PublicScope Brand Mark"
      role="img"
    >
      {/* Outer Diamond */}
      <motion.polygon
        points="120,24 216,120 120,216 24,120"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.84"
        animate={{
          rotate: isInvestigation
            ? finalAlignment
              ? 0
              : convergence
                ? -0.5
                : -1.5
            : 0,
        }}
        transition={{
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          transformOrigin: "120px 120px",
        }}
      />

      {/* Middle Diamond */}
      <motion.polygon
        points="120,54 186,120 120,186 54,120"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.84"
        animate={{
          rotate: isInvestigation
            ? finalAlignment
              ? 0
              : convergence
                ? -2
                : -5
            : -7,
        }}
        transition={{
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          transformOrigin: "120px 120px",
        }}
      />

      {/* Inner Diamond */}
      <motion.polygon
        points="120,84 156,120 120,156 84,120"
        fill={active || isInvestigation ? "var(--accent)" : "currentColor"}
        animate={{
          rotate: isInvestigation
            ? finalAlignment
              ? 0
              : convergence
                ? 2
                : 5
            : 6,
          scale: isInvestigation
            ? finalAlignment
              ? 1
              : convergence
                ? 0.98
                : 0.96
            : 1,
        }}
        transition={{
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{
          transformOrigin: "120px 120px",
        }}
      />
    </svg>
  );
}
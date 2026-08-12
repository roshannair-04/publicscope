"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  INVESTIGATION_STAGES,
  type InvestigationStage,
} from "@/constants/investigation";

import type { InvestigationState } from "@/types/investigation";

const STAGE_DURATION = 1200;

export function useInvestigation() {
  const [state, setState] = useState<InvestigationState>({
    query: "",
    stage: "planning",
    progress: 0,
  });

  const [isInvestigating, setIsInvestigating] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clearTimer();

    setState({
      query: "",
      stage: "planning",
      progress: 0,
    });

    setIsInvestigating(false);
    setIsComplete(false);
  }, [clearTimer]);

  const startInvestigation = useCallback(
    (query: string) => {
      const trimmedQuery = query.trim();

      if (!trimmedQuery || isInvestigating) {
        return;
      }

      clearTimer();

      setState({
        query: trimmedQuery,
        stage: "planning",
        progress: 0,
      });

      setIsInvestigating(true);
      setIsComplete(false);
    },
    [clearTimer, isInvestigating],
  );

  useEffect(() => {
    if (!isInvestigating) {
      return;
    }

    const currentIndex = INVESTIGATION_STAGES.indexOf(state.stage);

    if (currentIndex === -1) {
      return;
    }

    if (state.stage === "ready") {
      setState((current) => ({
            ...current,
            progress: 100,
  }));

  setIsInvestigating(false);
  setIsComplete(true);

  return;
}

    timerRef.current = setTimeout(() => {
      const nextStage =
        INVESTIGATION_STAGES[currentIndex + 1] as InvestigationStage;

      setState((current) => ({
        ...current,
        stage: nextStage,
        progress: Math.round(
          ((currentIndex + 1) /
            (INVESTIGATION_STAGES.length - 1)) *
            100,
        ),
      }));
    }, STAGE_DURATION);

    return clearTimer;
  }, [state.stage, isInvestigating, clearTimer]);

  return {
  state,
  isInvestigating,
  isComplete,
  startInvestigation,
  reset,
};
}
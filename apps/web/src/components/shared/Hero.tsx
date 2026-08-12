"use client";
import { BRAND } from "@/config/branding";
import { BrandMark } from "./BrandMark";
import { InvestigationSearch } from "@/components/ui/InvestigationSearch";
import { useInvestigation } from "@/hooks/useInvestigation";
import { InvestigationTransition } from "@/components/investigation/InvestigationTransition";
import { InvestigationWorkspace } from "@/components/workspace/InvestigationWorkspace";

export function Hero() {
  const {
  state,
  isInvestigating,
  isComplete,
  startInvestigation,
  reset,
} = useInvestigation();

  if (isComplete) {
  return (
    <InvestigationWorkspace
      query={state.query}
      onNewInvestigation={reset}
    />
  );
}

  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center">

        <BrandMark className="mb-8 h-16 w-16 text-white" />

        <h1 className="display text-6xl leading-tight tracking-tight">
          <span className="font-medium">Public</span>
          <span className="font-bold">Scope</span>
        </h1>

        <h2 className="mt-6 max-w-2xl text-3xl font-medium">
          {BRAND.tagline}
        </h2>

        <p className="mt-5 max-w-xl text-zinc-400">
          {BRAND.subtitle}
        </p>

       <div className="mt-12 w-full">
        <InvestigationSearch onSubmit={startInvestigation} />
      </div>

      {isInvestigating && (
        <InvestigationTransition
          stage={state.stage}
          query={state.query}
        />
      )}

      </div>
    </section>
  );
}
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import type { ClaimStatus, Investigation } from "@/types/investigation";

interface InvestigationWorkspaceProps {
  investigation: Investigation;
  onNewInvestigation: () => void;
}

const STATUS_LABELS: Record<ClaimStatus, string> = {
  supported: "Supported",
  disputed: "Disputed",
  opinion: "Opinion",
  unknown: "Unknown",
};

export function InvestigationWorkspace({
  investigation,
  onNewInvestigation,
}: InvestigationWorkspaceProps) {
  const {
  query,
  subject,
  summary,
  claims,
  sources,
  timeline,
} = investigation;

  const [selectedClaimId, setSelectedClaimId] = useState<string | null>(null);

  const selectedClaim =
    claims.find((claim) => claim.id === selectedClaimId) ?? null;

  const supportingSources = selectedClaim
    ? selectedClaim.supportingEvidenceIds
        .map((id) => sources.find((source) => source.id === id))
        .filter(
          (source): source is Investigation["sources"][number] =>
            Boolean(source),
        )
    : [];

  const challengingSources = selectedClaim
    ? selectedClaim.challengingEvidenceIds
        .map((id) => sources.find((source) => source.id === id))
        .filter(
          (source): source is Investigation["sources"][number] =>
            Boolean(source),
        )
    : [];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-black text-zinc-200"
    >
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-10">
        {/* Header */}
        <header className="border-b border-zinc-900 pb-10">
  <div className="flex items-start justify-between gap-8">
    <div>
      <p className="text-xs uppercase tracking-[0.22em] text-zinc-600">
        Investigation
      </p>

      <div className="mt-6 flex items-center gap-5">
        {subject.image ? (
          <img
            src={subject.image}
            alt=""
            className="h-14 w-14 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-800 text-sm uppercase tracking-[0.16em] text-zinc-600">
            {subject.name.slice(0, 2)}
          </div>
        )}

        <div>
          <h1 className="text-4xl font-medium tracking-tight text-white">
            {subject.name}
          </h1>

          <p className="mt-2 text-xs uppercase tracking-[0.18em] text-zinc-600">
            {subject.type}
          </p>
        </div>
      </div>

      {subject.description && (
        <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-600">
          {subject.description}
        </p>
      )}

      <p className="mt-4 text-sm text-zinc-700">
        {claims.length} claims · {sources.length} sources ·{" "}
        {timeline.length} events
      </p>
    </div>

    <button
      type="button"
      onClick={onNewInvestigation}
      className="shrink-0 text-sm text-zinc-600 transition-colors hover:text-zinc-200"
    >
      New investigation
    </button>
  </div>
</header>

        {/* Short version */}
        <section className="border-b border-zinc-900 py-14">
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-600">
            The short version
          </p>

          <p className="mt-5 max-w-4xl text-xl leading-9 tracking-tight text-zinc-300">
            {summary}
          </p>
        </section>

        {/* Claims */}
        <section className="py-14">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-zinc-600">
                Key claims
              </p>

              <h2 className="mt-3 text-2xl font-medium tracking-tight text-white">
                What the evidence suggests
              </h2>
            </div>

            <span className="text-xs text-zinc-700">
              {claims.length} claims
            </span>
          </div>

          <div className="mt-8 grid gap-px overflow-hidden border border-zinc-900 bg-zinc-900 md:grid-cols-2">
            {claims.map((claim) => {
              const isSelected = selectedClaimId === claim.id;

              return (
                <motion.button
                  key={claim.id}
                  type="button"
                  layout
                  onClick={() =>
                    setSelectedClaimId(isSelected ? null : claim.id)
                  }
                  className={`group bg-black p-7 text-left transition-colors ${
                    isSelected
                      ? "bg-white/[0.02]"
                      : "hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-zinc-600">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          claim.status === "supported"
                            ? "bg-[var(--accent)]"
                            : claim.status === "disputed"
                              ? "bg-zinc-400"
                              : "bg-zinc-700"
                        }`}
                      />

                      {STATUS_LABELS[claim.status]}
                    </span>

                    <span className="text-xs tabular-nums text-zinc-700">
                      {claim.evidenceScore}% evidence
                    </span>
                  </div>

                  <h3 className="mt-6 max-w-xl text-lg leading-7 text-zinc-200">
                    {claim.statement}
                  </h3>

                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-xs text-zinc-600">
                      {claim.supportingEvidenceIds.length +
                        claim.challengingEvidenceIds.length}{" "}
                        {claim.supportingEvidenceIds.length +
                        claim.challengingEvidenceIds.length ===
                        1
                          ? "source"
                          : "sources"}{" "}
                        connected
                    </p>

                    <span className="text-xs text-zinc-700 transition-colors group-hover:text-zinc-400">
                      {isSelected ? "Hide evidence" : "View evidence"}
                    </span>
                  </div>

                  <AnimatePresence initial={false}>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-7 border-t border-zinc-900 pt-6">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-700">
                            Connected evidence
                          </p>

                          <div className="mt-4 space-y-4">
                            {supportingSources.length > 0 && (
                              <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-700">
                                  Supporting evidence
                                </p>

                                <div className="mt-3 space-y-4">
                                  {supportingSources.map((source) => (
                                    <div
                                      key={source.id}
                                      className="border-l border-[var(--accent)]/40 pl-4"
                                    >
                                      <p className="text-sm text-zinc-300">
                                        {source.title}
                                      </p>

                                      <p className="mt-1 text-xs text-zinc-600">
                                        {source.publisher} · {source.publishedAt}
                                      </p>

                                      <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-zinc-700">
                                        {source.strength} source
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {challengingSources.length > 0 && (
                              <div className="mt-7">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-700">
                                  Challenging evidence
                                </p>

                                <div className="mt-3 space-y-4">
                                  {challengingSources.map((source) => (
                                    <div
                                      key={source.id}
                                      className="border-l border-zinc-700 pl-4"
                                    >
                                      <p className="text-sm text-zinc-300">
                                        {source.title}
                                      </p>

                                      <p className="mt-1 text-xs text-zinc-600">
                                        {source.publisher} · {source.publishedAt}
                                      </p>

                                      <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-zinc-700">
                                        {source.strength} source
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* Selected claim detail */}
        <AnimatePresence>
          {selectedClaim && (
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="border-t border-zinc-900 py-12"
            >
              <div className="max-w-3xl">
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-600">
                  Evidence detail
                </p>

                <h2 className="mt-4 text-2xl leading-9 tracking-tight text-white">
                  {selectedClaim.statement}
                </h2>

                <div className="mt-5 flex items-center gap-4 text-xs text-zinc-600">
                  <span className="uppercase tracking-[0.16em]">
                    {STATUS_LABELS[selectedClaim.status]}
                  </span>

                  <span>·</span>

                  <span>{selectedClaim.evidenceScore}% evidence strength</span>
                </div>

                <div className="mt-8 space-y-3">
                  {supportingSources.length > 0 && (
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-700">
                        Supporting
                      </p>

                      <div className="mt-3 space-y-3">
                        {supportingSources.map((source) => (
                          <a
                            key={source.id}
                            href={source.url}
                            target="_blank"
                            rel="noreferrer"
                            className="group block border border-zinc-900 p-5 transition-colors hover:border-zinc-700"
                          >
                            <div className="flex items-start justify-between gap-6">
                              <div>
                                <p className="text-sm text-zinc-300 group-hover:text-white">
                                  {source.title}
                                </p>

                                <p className="mt-2 text-xs text-zinc-600">
                                  {source.publisher} · {source.publishedAt}
                                </p>
                              </div>

                              <span className="text-xs uppercase tracking-[0.14em] text-zinc-700">
                                {source.strength}
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {challengingSources.length > 0 && (
                    <div className="mt-8">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-700">
                        Challenging
                      </p>

                      <div className="mt-3 space-y-3">
                        {challengingSources.map((source) => (
                          <a
                            key={source.id}
                            href={source.url}
                            target="_blank"
                            rel="noreferrer"
                            className="group block border border-zinc-900 p-5 transition-colors hover:border-zinc-700"
                          >
                            <div className="flex items-start justify-between gap-6">
                              <div>
                                <p className="text-sm text-zinc-300 group-hover:text-white">
                                  {source.title}
                                </p>

                                <p className="mt-2 text-xs text-zinc-600">
                                  {source.publisher} · {source.publishedAt}
                                </p>
                              </div>

                              <span className="text-xs uppercase tracking-[0.14em] text-zinc-700">
                                {source.strength}
                              </span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Timeline */}
        <section className="border-t border-zinc-900 py-14">
          <p className="text-xs uppercase tracking-[0.22em] text-zinc-600">
            Timeline
          </p>

          <div className="relative mt-10">
            <div className="absolute left-0 right-0 top-2 hidden h-px bg-zinc-900 md:block" />

            <div className="grid gap-10 md:grid-cols-3 md:gap-8">
              {timeline.map((event) => (
                <article key={event.id} className="relative">
                  <div className="mb-5 flex items-center gap-3">
                    <span className="relative z-10 h-2 w-2 rounded-full bg-zinc-600 ring-4 ring-black" />

                    <time className="text-xs tabular-nums text-zinc-600">
                      {event.date}
                    </time>
                  </div>

                  <h3 className="text-sm font-medium text-zinc-300">
                    {event.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    {event.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Sources */}
        <section className="border-t border-zinc-900 py-14">
          <div className="flex items-end justify-between">
            <p className="text-xs uppercase tracking-[0.22em] text-zinc-600">
              Sources
            </p>

            <span className="text-xs text-zinc-700">
              {sources.length} sources
            </span>
          </div>

          <div className="mt-7 divide-y divide-zinc-900 border-y border-zinc-900">
            {sources.map((source) => (
              <article
                key={source.id}
                className="flex flex-col gap-3 py-5 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="text-sm text-zinc-300">{source.title}</p>

                  <p className="mt-1 text-xs text-zinc-600">
                    {source.publisher} · {source.publishedAt}
                  </p>
                </div>

                <span className="text-xs uppercase tracking-[0.14em] text-zinc-700">
                  {source.strength} source
                </span>
              </article>
            ))}
          </div>
        </section>
      </div>
    </motion.main>
  );
}
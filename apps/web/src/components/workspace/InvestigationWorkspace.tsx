"use client";

import { motion } from "framer-motion";

interface InvestigationWorkspaceProps {
  query: string;
  onNewInvestigation: () => void;
}

export function InvestigationWorkspace({
  query,
  onNewInvestigation,
}: InvestigationWorkspaceProps) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-black text-zinc-200"
    >
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-zinc-900 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
              Investigation
            </p>

            <h1 className="mt-2 text-3xl font-medium tracking-tight text-white">
              {query}
            </h1>
          </div>

          <button
                type="button"
                onClick={onNewInvestigation}
                className="text-sm text-zinc-600 transition-colors hover:text-white">
            New investigation
            </button>
        </header>

        {/* Overview */}
        <section className="mt-12">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
            Overview
          </p>

          <div className="mt-5 max-w-3xl">
            <h2 className="text-2xl font-medium tracking-tight text-white">
              What is actually happening?
            </h2>

            <p className="mt-4 leading-7 text-zinc-500">
              Your investigation is ready to be assembled from evidence,
              public discussion, and relevant events.
            </p>
          </div>
        </section>

        {/* Evidence + Timeline */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <section>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
              Evidence
            </p>

            <div className="mt-5 border-t border-zinc-900">
              <div className="border-b border-zinc-900 py-5">
                <p className="text-sm text-zinc-300">
                  Sources will appear here
                </p>

                <p className="mt-1 text-sm text-zinc-700">
                  Articles, documents, and public records
                </p>
              </div>

              <div className="border-b border-zinc-900 py-5">
                <p className="text-sm text-zinc-300">
                  Claims will appear here
                </p>

                <p className="mt-1 text-sm text-zinc-700">
                  Statements extracted from evidence
                </p>
              </div>
            </div>
          </section>

          <section>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-600">
              Timeline
            </p>

            <div className="relative mt-5 border-l border-zinc-900 pl-6">
              {[
                "Relevant event",
                "Public reaction",
                "Latest development",
              ].map((event, index) => (
                <div
                  key={event}
                  className={`relative ${
                    index !== 2 ? "pb-10" : ""
                  }`}
                >
                  <span className="absolute -left-[29px] top-1 h-1.5 w-1.5 rounded-full bg-zinc-700" />

                  <p className="text-sm text-zinc-400">
                    {event}
                  </p>

                  <p className="mt-1 text-xs text-zinc-700">
                    Investigation data will populate this event.
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.main>
  );
}
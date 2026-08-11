"use client";

import { useEffect, useRef, useState } from "react";

import { AnimatedPlaceholder } from "./AnimatedPlaceholder";
import {
  EXPLORE_TOPICS,
  LANDING_PLACEHOLDERS,
} from "@/constants/landing";

export function InvestigationSearch() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const showOverlay = query.length === 0;

  // Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      // "/" → focus search
      if (
        event.key === "/" &&
        document.activeElement !== inputRef.current
      ) {
        event.preventDefault();
        inputRef.current?.focus();
      }

      // ⌘K / Ctrl+K → focus search
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        inputRef.current?.focus();
      }

      // Escape → clear search
      if (event.key === "Escape") {
        setQuery("");
        inputRef.current?.focus();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleTopicSelect(topic: string) {
    setQuery(topic);
    inputRef.current?.focus();
  }

  return (
    <div className="w-full">
      {/* Search */}
      <div className="relative mx-auto max-w-5xl">
        {showOverlay && (
          <AnimatedPlaceholder
            items={LANDING_PLACEHOLDERS}
            paused={focused}
          />
        )}

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder=""
          aria-label="What are you trying to understand?"
          className="
            w-full
            border-0
            border-b
            border-zinc-800
            bg-transparent
            py-5
            text-center
            text-2xl
            text-white
            outline-none
            transition-all
            duration-300
            focus:border-white
          "
        />
      </div>

      {/* Explore Topics */}
      <div className="mt-10">
        <p className="mb-4 text-center text-xs uppercase tracking-[0.2em] text-zinc-600">
          Explore a topic
        </p>

        <div className="flex flex-wrap justify-center gap-x-7 gap-y-3">
          {EXPLORE_TOPICS.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => handleTopicSelect(topic)}
              className="
                group
                flex
                items-center
                gap-2
                text-sm
                text-zinc-500
                transition-colors
                duration-200
                hover:text-white
              "
            >
              <span
                className="
                  text-[10px]
                  opacity-0
                  transition-opacity
                  duration-200
                  group-hover:opacity-100
                "
                aria-hidden="true"
              >
                ◆
              </span>

              <span>{topic}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard hints */}
      <div className="mt-8 flex justify-center gap-5 text-xs text-zinc-700">
        <span>
          <kbd>/</kbd> Search
        </span>

        <span>
          <kbd>⌘K</kbd> Focus
        </span>

        <span>
          <kbd>Esc</kbd> Clear
        </span>
      </div>
    </div>
  );
}
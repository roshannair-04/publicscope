export const INVESTIGATION_STAGES = [
  "planning",
  "searching",
  "extracting",
  "connecting",
  "building",
  "ready",
] as const;

export type InvestigationStage =
  (typeof INVESTIGATION_STAGES)[number];

export const INVESTIGATION_MESSAGES: Record<
  InvestigationStage,
  string
> = {
  planning: "Understanding the question",
  searching: "Finding relevant sources",
  extracting: "Comparing accounts",
  connecting: "Tracing the evidence",
  building: "Mapping the story",
  ready: "The story is taking shape.",
};
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
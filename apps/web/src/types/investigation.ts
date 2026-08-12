import type { InvestigationStage } from "@/constants/investigation";

export interface InvestigationState {
  query: string;
  stage: InvestigationStage;
  progress: number;
}

export type ClaimStatus =
  | "supported"
  | "disputed"
  | "opinion"
  | "unknown";

export type EvidenceStrength =
  | "strong"
  | "moderate"
  | "weak";

export interface Source {
  id: string;
  title: string;
  publisher: string;
  url: string;
  publishedAt: string;
  strength: EvidenceStrength;
}

export interface Claim {
  id: string;
  statement: string;
  status: ClaimStatus;
  evidenceScore: number;
  evidenceIds: string[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  evidenceIds: string[];
}

export interface Investigation {
  id: string;
  query: string;
  summary: string;
  claims: Claim[];
  sources: Source[];
  timeline: TimelineEvent[];
}
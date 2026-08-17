import type { InvestigationStage } from "@/constants/investigation";

export type SubjectType =
  | "person"
  | "organization"
  | "place"
  | "event"
  | "topic";

export interface Subject {
  id: string;
  name: string;
  type: SubjectType;
  description?: string;
  image?: string;
}
export interface InvestigationNote {
  id: string;
  content: string;
  createdAt: string;
}
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
  supportingEvidenceIds: string[];
  challengingEvidenceIds: string[];
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
  subject: Subject;
  summary: string;
  claims: Claim[];
  sources: Source[];
  timeline: TimelineEvent[];
}
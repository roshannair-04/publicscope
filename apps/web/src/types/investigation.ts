import type { InvestigationStage } from "@/constants/investigation";

export interface InvestigationState {
  query: string;
  stage: InvestigationStage;
  progress: number;
}
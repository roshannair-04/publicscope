import type { Investigation } from "@/types/investigation";

export interface InvestigationRequest {
  query: string;
}

export interface InvestigationResponse {
  version: "1";
  investigation: Investigation;
}

export interface InvestigationError {
  code: string;
  message: string;
}
import type { Investigation } from "@/types/investigation";
import type {
  InvestigationRequest,
  InvestigationResponse,
} from "@/types/api";

import { MOCK_INVESTIGATION } from "@/data/mock-investigation";

export async function mockInvestigate(
  request: InvestigationRequest,
): Promise<InvestigationResponse> {
  const investigation: Investigation = {
    ...MOCK_INVESTIGATION,
    query: request.query,
  };

  return {
    version: "1",
    investigation,
  };
}
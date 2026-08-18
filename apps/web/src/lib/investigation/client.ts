import type {
  InvestigationRequest,
  InvestigationResponse,
} from "@/types/api";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export async function createInvestigation(
  request: InvestigationRequest,
): Promise<InvestigationResponse> {
  const response = await fetch(`${API_BASE_URL}/v1/research`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(
      `Investigation request failed: ${response.status}`,
    );
  }

  return response.json() as Promise<InvestigationResponse>;
}
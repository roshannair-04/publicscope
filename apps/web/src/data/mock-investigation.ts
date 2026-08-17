
import type { Investigation } from "@/types/investigation";

export const MOCK_INVESTIGATION: Investigation = {
  id: "investigation-001",

  query: "Tesla",

  subject: {
    id: "subject-tesla",
    name: "Tesla",
    type: "organization",
    description:
      "An electric vehicle and energy company navigating product expansion, regulatory scrutiny, and shifting public expectations.",
  },

  summary:
    "Tesla is navigating a period of rapid product expansion, regulatory scrutiny, and shifting public expectations. The available evidence suggests that several narratives around the company are being driven by different underlying events rather than a single development.",

  sources: [
    {
      id: "source-001",
      title: "Tesla quarterly report",
      publisher: "Tesla",
      url: "https://example.com/tesla-report",
      publishedAt: "2026-07-23",
      strength: "strong",
    },
    {
      id: "source-002",
      title: "Tesla faces renewed regulatory scrutiny",
      publisher: "Reuters",
      url: "https://example.com/tesla-regulation",
      publishedAt: "2026-07-25",
      strength: "strong",
    },
    {
      id: "source-003",
      title: "What the latest Tesla developments mean",
      publisher: "The Verge",
      url: "https://example.com/tesla-analysis",
      publishedAt: "2026-07-27",
      strength: "moderate",
    },
  ],

  claims: [
    {
      id: "claim-001",
      statement:
        "Tesla is increasing its investment in autonomous driving technology.",
      status: "supported",
      evidenceScore: 86,
      supportingEvidenceIds: ["source-001", "source-003"],
      challengingEvidenceIds: [],
    },
    {
      id: "claim-002",
      statement:
        "Regulatory scrutiny is creating additional uncertainty around Tesla's autonomous driving strategy.",
      status: "disputed",
      evidenceScore: 61,
      supportingEvidenceIds: ["source-003"],
      challengingEvidenceIds: [],
    },
    {
      id: "claim-003",
      statement:
        "Public discussion around Tesla is increasingly shaped by expectations about its future products.",
      status: "opinion",
      evidenceScore: 42,
      supportingEvidenceIds: ["source-003"],
      challengingEvidenceIds: [],
    },
  ],
  

  timeline: [
    {
      id: "event-001",
      date: "2026-07-23",
      title: "Quarterly results published",
      description:
        "Tesla published its latest quarterly results and outlined several areas of continued investment.",
      evidenceIds: ["source-001"],
    },
    {
      id: "event-002",
      date: "2026-07-25",
      title: "Regulatory scrutiny increases",
      description:
        "Regulators raised additional questions surrounding autonomous driving technology.",
      evidenceIds: ["source-002"],
    },
    {
      id: "event-003",
      date: "2026-07-27",
      title: "Public discussion shifts",
      description:
        "Analysis and public discussion increasingly focused on Tesla's future product strategy.",
      evidenceIds: ["source-003"],
    },
  ],
};
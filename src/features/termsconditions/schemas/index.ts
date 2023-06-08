import { z } from "zod";

import { VeridaBaseRecordSchema } from "~/features/verida";

// To keep in sync with the corresponding schema.json
// TODO: Find a wayt to generate this from the schema.json
export const TermsConditionsSchema = z.object({
  status: z.enum(["unknown", "accepted", "rejected"]).default("unknown"),
});

export const TermsConditionsRecordSchema = VeridaBaseRecordSchema.extend(
  TermsConditionsSchema.shape
).passthrough();

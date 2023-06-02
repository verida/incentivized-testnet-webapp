import { z } from "zod";

// To keep in sync with the schem.json
// TODO: Find a wayt to generate this from the schema.json
export const TermsConditionsRecordSchema = z
  .object({
    status: z.enum(["unknown", "accepted", "rejected"]).default("unknown"),
  })
  .passthrough();

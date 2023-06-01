import { z } from "zod";

export const TermsConditionsRecordSchema = z
  .object({
    status: z.enum(["unknown", "accepted", "rejected"]).default("unknown"),
  })
  .passthrough();

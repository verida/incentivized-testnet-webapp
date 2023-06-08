import { z } from "zod";

export const VeridaBaseRecordSchema = z
  .object({
    _id: z.string(),
    _rev: z.string(),
    schema: z.string(),
    insertedAt: z.string().datetime(),
    modifiedAt: z.string().datetime(),
  })
  .passthrough();

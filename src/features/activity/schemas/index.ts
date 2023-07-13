import { z } from "zod";

import { VeridaBaseRecordSchema } from "~/features/verida";

// To keep in sync with the schem.json
// TODO: Find a wayt to generate this from the schema.json
export const UserActivitySchema = z.object({
  id: z.string(),
  status: z.enum(["todo", "pending", "completed"]).default("todo"),
  completionDate: z.string().datetime().optional(),
  data: z
    .object({
      requestId: z.string().optional(),
    })
    .optional(),
  // TODO: Add needed information: proof, ...
});

export const UserActivityRecordSchema = VeridaBaseRecordSchema.extend(
  UserActivitySchema.shape
).passthrough();

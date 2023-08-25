import { z } from "zod";

import { VeridaBaseRecordSchema } from "~/features/verida";

export const UserActivityDataSchema = z.object({
  requestId: z.string().optional(),
  referralLink: z.string().url().optional(),
});

// To keep in sync with the schema.json
// TODO: Find a wayt to generate this from the schema.json
export const UserActivitySchema = z.object({
  id: z.string(), // Not _id, this is the id of the activity, ie. 'create-verida-identity'
  status: z.enum(["todo", "pending", "completed"]).default("todo"),
  completionDate: z.string().datetime().optional(),
  data: UserActivityDataSchema.optional(),
  // TODO: Add needed information: proof, ...
});

export const UserActivityRecordSchema = VeridaBaseRecordSchema.extend(
  UserActivitySchema.shape
).passthrough();

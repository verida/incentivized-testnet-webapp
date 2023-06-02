import { z } from "zod";

// To keep in sync with the schem.json
// TODO: Find a wayt to generate this from the schema.json
export const ActivityRecordSchema = z
  .object({
    // TODO: Add the base properties (_id, ...)
    id: z.string(),
    status: z.enum(["todo", "pending", "completed"]).default("todo"),
    // TODO: Add needed information: proof, ...
  })
  .passthrough();

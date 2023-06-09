import { z } from "zod";

import {
  TermsConditionsRecordSchema,
  TermsConditionsSchema,
} from "~/features/termsconditions/schemas";

export type TermsConditionsStatus = "unknown" | "accepted" | "rejected";

export type TermsConditions = z.infer<typeof TermsConditionsSchema>;
export type TermsConditionsRecord = z.infer<typeof TermsConditionsRecordSchema>;

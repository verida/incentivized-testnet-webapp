import { z } from "zod";

import { TermsConditionsRecordSchema } from "~/features/termsconditions";

export type TermsConditionsStatus = "unknown" | "accepted" | "rejected";

export type TermsConditionsRecord = z.infer<typeof TermsConditionsRecordSchema>;

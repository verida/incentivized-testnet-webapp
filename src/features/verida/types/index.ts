import { z } from "zod";

import { VeridaBaseRecordSchema } from "~/features/verida";

export type VeridaBaseRecord = z.infer<typeof VeridaBaseRecordSchema>;

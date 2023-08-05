import { z } from "zod";

export const VeridaBaseRecordSchema = z
  .object({
    _id: z.string(),
    _rev: z.string(),
    name: z.string().optional(),
    schema: z.string(),
    insertedAt: z.string().datetime(),
    modifiedAt: z.string().datetime(),
  })
  .passthrough();

export const VerifiableCredentialBaseSchema = z
  .object({
    id: z.string(),
    issuanceDate: z.string().datetime(),
    expirationDate: z.string().datetime().optional(),
    credentialSchema: z.object({ id: z.string(), type: z.string() }),
    issuer: z.string(),
    credentialSubject: z.unknown(),
    type: z.array(z.string()),
  })
  .passthrough();

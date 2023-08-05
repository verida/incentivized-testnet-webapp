import { z } from "zod";

import { VeridaBaseRecordSchema } from "~/features/verida";

export type VeridaBaseRecord = z.infer<typeof VeridaBaseRecordSchema>;

export type VerifiableCredential<T = unknown> = {
  id: string;
  issuanceDate: string;
  expirationDate: string;
  credentialSchema: { id: string; type: string };
  issuer: string;
  credentialSubject: T;
  type: string[];
};

export type VeridaVerifiableCredentialRecord<T = unknown> = VeridaBaseRecord & {
  credentialData: VerifiableCredential<T>;
  credentialSchema: string;
};

export type ReceivedMessage<D> = {
  data: {
    data: D[];
    replyId: string;
  };
};

export type SentMessage = {
  id: string;
  ok: boolean;
  rev: string;
};

export type SendDataRequestOptions = {
  messageSubject: string;
  requestSchema: string;
  filter?: Record<string, unknown>;
  userSelectLimit?: number;
  userSelect?: boolean;
};

export type SentDataRequest = {
  id: string;
  ok: boolean;
  rev: string;
};

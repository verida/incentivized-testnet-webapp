import { z } from "zod";

import { VeridaBaseRecordSchema } from "~/features/verida";

export type VeridaBaseRecord = z.infer<typeof VeridaBaseRecordSchema>;

export type VerifiableCredential = {
  credentialData: {
    credentialSchema: { id: string };
    issuer: string;
  };
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

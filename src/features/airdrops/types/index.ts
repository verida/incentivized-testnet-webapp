import { type MessageDescriptor } from "react-intl";

import { UserActivityRecord } from "~/features/activity";

export type AirdropDefinition = {
  id: number;
  shortTitle: MessageDescriptor;
  longTitle: MessageDescriptor;
};

export type SubmitAirdrop1ProofPayload = {
  did: string;
  activityProofs: UserActivityRecord[];
  profile: {
    name?: string;
    country?: string;
  };
  termsAccepted?: boolean;
};

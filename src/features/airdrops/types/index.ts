import { UserActivityRecord } from "~/features/activity";

export type SubmitAirdrop1ProofPayload = {
  did: string;
  activityProofs: UserActivityRecord[];
  profile: {
    name?: string;
    country?: string;
  };
  location?: string;
  termsAccepted?: boolean;
};

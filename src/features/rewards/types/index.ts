import { UserActivityRecord } from "~/features/activity";

export type SubmitClaimRequestPayload = {
  did: string;
  userWalletAddress: string;
  activityProofs: UserActivityRecord[];
  profile: {
    name: string;
    country: string;
  };
};

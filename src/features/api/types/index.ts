import { UserActivityRecord } from "~/features/activity";

export type ApiErrorResponse = {
  status: "error";
  errorMessage?: string;
  errorUserMessage?: string;
};

export type Airdrop1CheckProofExistSuccessResponse = {
  status: "success";
  exists: boolean;
};

export type Airdrop1SubmitProofSuccessResponse = {
  status: "success";
};

export type Airdrop2CheckEligibilitySuccessResponse = {
  status: "success";
  isEligible: boolean;
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

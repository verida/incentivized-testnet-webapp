import { UserActivityRecord } from "~/features/activity";

export type ApiErrorResponse = {
  status: "error";
  errorMessage?: string;
  errorUserMessage?: string;
};

// ==== Airdrop 1

export type Airdrop1CheckSuccessResponse = {
  status: "success";
  isRegistered: boolean;
  isClaimed: boolean;
  claimableTokenAmount: number | null;
};

export type Airdrop1RegistrationDto = {
  did: string;
  activityProofs: UserActivityRecord[];
  profile: {
    name?: string;
    country?: string;
  };
  termsAccepted?: boolean;
};

export type Airdrop1RegisterSuccessResponse = {
  status: "success";
};

// ==== Airdrop 1

export type Airdrop2CheckEligibilitySuccessResponse = {
  status: "success";
  isEligible: boolean;
};

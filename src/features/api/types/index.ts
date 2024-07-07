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
  claimedTokenAmount: number | null;
  claimTransactionUrl: string | null;
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

export type Airdrop1ClaimDto = {
  did: string;
  termsAccepted?: boolean;
  userEvmAddress: string;
  userEvmAddressSignature: string;
};

export type Airdrop1ClaimSuccessResponse = {
  status: "success";
  transactionExplorerUrl: string;
  claimedTokenAmount: number;
};

// ==== Airdrop 2

export type Airdrop2CheckEligibilitySuccessResponse = {
  status: "success";
  isEligible: boolean;
};

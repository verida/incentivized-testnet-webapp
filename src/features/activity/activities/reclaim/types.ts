type ReclaimClaimData = {
  provider: string;
  identifier: string;
  parameters?: string;
  epoch?: string;
};
type ReclaimProof = {
  identifier: string;
  claimData: ReclaimClaimData;
  signature: string;
};
export type ReclaimProofOfUberCredentialSubject = {
  appId: string;
  proofs: ReclaimProof[];
  sessionId: string;
  reclaimProviderId: string;
  reclaimProviderLabel: string;
  httpProviderId?: string[];
};

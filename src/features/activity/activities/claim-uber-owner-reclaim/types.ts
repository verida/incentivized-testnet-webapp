// export type ZKProofOfUberCredentialSubject = {
//   allocatorAddress: string;
//   allocatorSignature: string;
//   taskId: string;
//   validatorAddress: string;
//   validatorSignature: string;
//   publicFields: string[];
//   publicFieldsHash: string;
//   zkPassSchemaId: string;
//   zkPassSchemaLabel: string;
// };

type ReclaimClaimData = {
  provider: string;
  parameters: string;
  identifier: string;
  epoch: string;
};
type ReclaimProof = {
  identifier: string;
  claimData: ReclaimClaimData;
  signature: string;
};
export type ReclaimProofOfUberCredentialSubject = {
  appId: string;
  httpProviderId: string[];
  proofs: ReclaimProof[];
  sessionId: string;
  reclaimProviderId: string;
  reclaimProviderLabel: string;
};

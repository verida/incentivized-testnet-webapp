// TODO Add field to detect Uber credential. e.g, type: 'uber'
// For now, this is generic schema
export type ReclaimProofOfUberCredentialSubject = {
  allocatorAddress: string;
  allocatorSignature: boolean;
  taskId: string;
  validatorAddress: string;
  validatorSignature: string;
};

export type ZkPassCredentialSubject = {
  taskId: string;
  allocatorAddress: string;
  allocatorSignature: string;
  uHash: string;
  validatorAddress: string;
  validatorSignature: string;
  zkPassSchemaId: string;
  zkPassSchemaLabel: string;
  id: string;
  publicFields?: unknown[];
  publicFieldsHash?: string;
};

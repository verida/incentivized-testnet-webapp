export const VAULT_CONTEXT_NAME = "Verida: Vault";

export const VAULT_CREDENTIAL_SCHEMA_URL =
  "https://common.schemas.verida.io/credential/base/v0.2.0/schema.json";

export const VERIDA_CREDENTIAL_ZKPASS_SCHEMA_URL =
  "https://common.schemas.verida.io/credential/zkpass/v0.1.0/schema.json";

export const VERIDA_DID_REGEXP =
  /did:vda:(devnet|mainnet|testnet):0x[0-9a-fA-F]{40}/;

export const VERIDA_CONNECT_SESSION_LOCAL_STORAGE_KEY = "_verida_auth_context";
export const CLEAR_SESSION_AFTER_MAINNET_UPGRADE_LOCAL_STORAGE_KEY =
  "_session_cleared_after_mainnet_upgrade";

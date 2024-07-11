import { AIRDROP_1_DEFINITION } from "~/features/airdrops/constants/airdrop1";
import { AIRDROP_2_DEFINITION } from "~/features/airdrops/constants/airdrop2";
import { AIRDROP_3_DEFINITION } from "~/features/airdrops/constants/airdrop3";

export const airdrops = [
  AIRDROP_1_DEFINITION,
  AIRDROP_2_DEFINITION,
  AIRDROP_3_DEFINITION,
]
  .filter((airdrop) => airdrop.enabled)
  .sort((a, b) => a.order - b.order);

export const AIRDROPS_CRYPTO_WALLET_MESSAGE_TO_SIGN =
  "I am the owner of this address for the Verida Airdrops";

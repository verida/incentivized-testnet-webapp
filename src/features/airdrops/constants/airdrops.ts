import { AIRDROP_1_DEFINITION } from "~/features/airdrops/constants/airdrop1";
import { AIRDROP_2_DEFINITION } from "~/features/airdrops/constants/airdrop2";

export const airdrops = [AIRDROP_1_DEFINITION, AIRDROP_2_DEFINITION]
  .filter((airdrop) => airdrop.enabled)
  .sort((a, b) => a.order - b.order);

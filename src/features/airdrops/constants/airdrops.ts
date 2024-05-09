import { defineMessage } from "react-intl";

import { AirdropDefinition } from "~/features/airdrops/types";

// Airdrop 1: Early Adopters

export const AIRDROP_1_DEFINITION: AirdropDefinition = {
  id: 1,
  shortTitle: defineMessage({
    id: "airdrops.airdrop1.shortTitle",
    defaultMessage: "Airdrop 1: Early Adopters",
    description: "Short title of the airdrop 1",
  }),
  longTitle: defineMessage({
    id: "airdrops.airdrop1.longTitle",
    defaultMessage: "Airdrop 1: Early Adopters",
    description: "Long title of the airdrop 1",
  }),
};

export const AIRDROP_1_MIN_XP_POINTS = 50;

// Airdrop 2: Galxe and Zealy Participants

export const AIRDROP_2_DEFINITION: AirdropDefinition = {
  id: 2,
  shortTitle: defineMessage({
    id: "airdrops.airdrop2.shortTitle",
    defaultMessage: "Airdrop 2: Galxe and Zealy",
    description: "Short title of the airdrop 2",
  }),
  longTitle: defineMessage({
    id: "airdrops.airdrop2.longTitle",
    defaultMessage: "Airdrop2: Galxe and Zealy Participants",
    description: "Long title of the airdrop 2",
  }),
};

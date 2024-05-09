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
  articleUrl:
    "https://news.verida.io/verida-announces-inaugural-early-adopters-airdrop-f1e42399fe91",
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
  articleUrl:
    "https://news.verida.io/verida-announces-2-200-000-vda-airdrop-2-for-early-galxe-and-zealy-campaign-participants-977b99b40459",
};

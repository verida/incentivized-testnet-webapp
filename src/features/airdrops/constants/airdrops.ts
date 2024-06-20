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
  description: defineMessage({
    id: "airdrops.airdrop1.description",
    defaultMessage:
      "This airdrop rewards early participants in Verida's Missions program. Early community members were able to explore and experience the benefits of effective self-sovereign identity and data ownership in web3.",
    description: "Description of the airdrop 1",
  }),
  vdaAllocation: "1M",
  resource: {
    label: defineMessage({
      id: "airdrops.airdrop1.resource.label",
      defaultMessage: "Learn More",
      description: "Label for the resource of the airdrop 1",
    }),
    url: "https://news.verida.io/verida-announces-inaugural-early-adopters-airdrop-f1e42399fe91",
  },
};

export const AIRDROP_1_MIN_XP_POINTS = 50;

// Airdrop 2: Galxe and Zealy Participants

export const AIRDROP_2_DEFINITION: AirdropDefinition = {
  id: 2,
  shortTitle: defineMessage({
    id: "airdrops.airdrop2.shortTitle",
    defaultMessage: "Airdrop 2: Early Galxe and Zealy",
    description: "Short title of the airdrop 2",
  }),
  longTitle: defineMessage({
    id: "airdrops.airdrop2.longTitle",
    defaultMessage: "Airdrop 2: Early Galxe and Zealy Participants",
    description: "Long title of the airdrop 2",
  }),
  description: defineMessage({
    id: "airdrops.airdrop2.description",
    defaultMessage:
      "Airdrop 2 rewards Veridians who participated in Verida Zealy campaigns or Galxe campaigns between 2023 and 2024.",
    description: "Description of the airdrop 2",
  }),
  vdaAllocation: "2.2M",
  resource: {
    label: defineMessage({
      id: "airdrops.airdrop2.resource.label",
      defaultMessage: "Learn More",
      description: "Label for the resource of the airdrop 2",
    }),
    url: "https://news.verida.io/verida-announces-2-200-000-vda-airdrop-2-for-early-galxe-and-zealy-campaign-participants-977b99b40459",
  },
};

import { EnvironmentType } from "@verida/types";
import { defineMessage } from "react-intl";

import { config } from "~/config";
import { AirdropDefinition } from "~/features/airdrops/types";

// Airdrop 1: Early Adopters

export const AIRDROP_1_DEFINITION: AirdropDefinition = {
  id: "airdrop1",
  order: 1,
  enabled: true && config.verida.environment === EnvironmentType.MAINNET,
  title: defineMessage({
    id: "airdrops.airdrop1.title",
    defaultMessage: "Airdrop 1: Early Adopters",
    description: "Title of the airdrop 1",
  }),
  description: defineMessage({
    id: "airdrops.airdrop1.description",
    defaultMessage:
      "This airdrop rewards early participants in Verida's Missions program. Early community members were able to explore and experience the benefits of effective self-sovereign identity and data ownership in web3.{newline}{newline}Prove your eligibility for the Airdrop 1 now while it's open.",
    description: "Description of the airdrop 1",
  }),
  actionLabel: defineMessage({
    id: "airdrops.airdrop1.actionLabel",
    defaultMessage: "Prove",
    description: "Label for the action of the airdrop 1",
  }),
  requirements: defineMessage({
    id: "airdrops.airdrop1.requirements",
    defaultMessage:
      "- Earned 50 XP on Verida Missions before March 21st 2024{newline}{newline}- Registered for the airdrop by proving your XP points",
    description: "Requirements of the airdrop 1",
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
  accentColor: "#6C3E924D",
};

export const AIRDROP_1_MIN_XP_POINTS = 50;

import { EnvironmentType } from "@verida/types";
import { defineMessage } from "react-intl";

import { config } from "~/config";
import { AirdropDefinition } from "~/features/airdrops/types";

export const AIRDROP_1_DEFINITION: AirdropDefinition = {
  id: "airdrop1",
  status: "registration-closed",
  order: 1,
  enabled: true && config.verida.environment === EnvironmentType.MAINNET,
  registrationCloseDate: new Date("2024-07-01T00:00:00Z"),
  title: defineMessage({
    id: "airdrops.airdrop1.title",
    defaultMessage: "Verida Airdrop 1",
    description: "Title of the airdrop 1",
  }),
  description: defineMessage({
    id: "airdrops.airdrop1.description",
    defaultMessage:
      "This airdrop rewards early participants in Verida's Missions program. Early community members were able to explore and experience the benefits of effective self-sovereign identity and data ownership in web3.",
    description: "Description of the airdrop 1",
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
  accentColor: "rgba(108, 62, 146, 0.3)",
};

export const AIRDROP_1_MIN_XP_POINTS = 50;

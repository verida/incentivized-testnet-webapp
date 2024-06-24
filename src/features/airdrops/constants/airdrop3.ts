import { EnvironmentType } from "@verida/types";
import { defineMessage } from "react-intl";

import { config } from "~/config";
import { AirdropDefinition } from "~/features/airdrops/types";

export const AIRDROP_3_DEFINITION: AirdropDefinition = {
  id: "airdrop3",
  status: "coming-soon",
  order: 3,
  enabled: true && config.verida.environment === EnvironmentType.MAINNET,
  title: defineMessage({
    id: "airdrops.airdrop3.title",
    defaultMessage: "Verida Airdrop 3",
    description: "Title of the airdrop 3",
  }),
  description: defineMessage({
    id: "airdrops.airdrop3.description",
    defaultMessage: "-",
    description: "Description of the airdrop 3",
  }),
  actionLabel: defineMessage({
    id: "airdrops.airdrop3.actionLabel",
    defaultMessage: "-",
    description: "Label for the action of the airdrop 3",
  }),
  actionMessage: defineMessage({
    id: "airdrops.airdrop3.actionMessage",
    defaultMessage: "-",
    description:
      "Message displayed above the action button in the airdrop 3 card",
  }),
  accentColor: "#19193D",
};

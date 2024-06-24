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
  accentColor: "rgba(25, 25, 61, 0.3)",
};

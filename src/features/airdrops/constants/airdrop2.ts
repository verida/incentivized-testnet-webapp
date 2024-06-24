import { EnvironmentType } from "@verida/types";
import { defineMessage } from "react-intl";

import { config } from "~/config";
import { AirdropDefinition } from "~/features/airdrops/types";

export const AIRDROP_2_DEFINITION: AirdropDefinition = {
  id: "airdrop2",
  status: "checking",
  order: 2,
  enabled: true && config.verida.environment === EnvironmentType.MAINNET,
  title: defineMessage({
    id: "airdrops.airdrop2.title",
    defaultMessage: "Verida Airdrop 2",
    description: "Title of the airdrop 2",
  }),
  description: defineMessage({
    id: "airdrops.airdrop2.description",
    defaultMessage:
      "Airdrop 2 rewards Veridians who participated in Verida Zealy campaigns or Galxe campaigns between 2023 and 2024.",
    description: "Description of the airdrop 2",
  }),
  actionLabel: defineMessage({
    id: "airdrops.airdrop2.actionLabel",
    defaultMessage: "Check",
    description: "Label for the action of the airdrop 2",
  }),
  actionMessage: defineMessage({
    id: "airdrops.airdrop2.actionMessage",
    defaultMessage: "Check if you are included in the airdrop",
    description:
      "Message displayed above the action buttonin the airdrop 2 card",
  }),
  requirements: defineMessage({
    id: "airdrops.airdrop2.requirements",
    defaultMessage:
      "- Participated in a Verida Zealy campaign or Galxe campaign between 2023 and 2024",
    description: "Requirements of the airdrop 2",
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
  accentColor: "#24545B",
};

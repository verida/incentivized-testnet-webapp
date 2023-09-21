import { defineMessage } from "react-intl";

import type { Mission } from "~/features/activity/types";

export const MISSION_03_ID = "mission-03";

export const mission: Mission = {
  id: MISSION_03_ID,
  idLabel: defineMessage({
    id: "missions.mission-03.idLabel",
    defaultMessage: "Mission 3",
    description: "Label of the mission id 03",
  }),
  enabled: false,
  visible: true,
  frozen: false,
  order: 3,
  title: defineMessage({
    id: "missions.mission-03.title",
    defaultMessage: "Stress testing the network",
    description: "Title of the mission 03",
  }),
  shortDescription: defineMessage({
    id: "missions.mission-03.shortDescription",
    defaultMessage:
      "In Mission 3 we need your help to stress-test the Network infrastructure. By performing various activities and pushing the limits of the testnet, you will play a crucial role in identifying and resolving any potential bottlenecks or vulnerabilities. Your efforts will ensure that the Verida mainnet operates at its full potential, providing a reliable and efficient decentralized storage solution.",
    description: "Short description of the mission 03",
  }),
  longDescription: defineMessage({
    id: "missions.mission-03.longDescription",
    defaultMessage:
      "In Mission 3 we need your help to stress-test the Network infrastructure. By performing various activities and pushing the limits of the testnet, you will play a crucial role in identifying and resolving any potential bottlenecks or vulnerabilities. Your efforts will ensure that the Verida mainnet operates at its full potential, providing a reliable and efficient decentralized storage solution.",
    description: "Long description of the mission 03",
  }),
};

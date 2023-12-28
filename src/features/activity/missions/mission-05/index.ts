import { defineMessage } from "react-intl";

import type { Mission } from "~/features/activity/types";

export const MISSION_05_ID = "mission-05";

export const mission: Mission = {
  id: MISSION_05_ID,
  idLabel: defineMessage({
    id: "missions.mission-05.idLabel",
    defaultMessage: "Mission 5",
    description: "Label of the mission id 05",
  }),
  enabled: false,
  visible: false,
  frozen: false,
  order: 5,
  title: defineMessage({
    id: "missions.mission-05.title",
    defaultMessage: "Stress testing the network",
    description: "Title of the mission 05",
  }),
  shortDescription: defineMessage({
    id: "missions.mission-05.shortDescription",
    defaultMessage:
      "In Mission 5 we need your help to stress-test the Network infrastructure. By performing various activities and pushing the limits of the testnet, you will play a crucial role in identifying and resolving any potential bottlenecks or vulnerabilities. Your efforts will ensure that the Verida mainnet operates at its full potential, providing a reliable and efficient decentralized storage solution.",
    description: "Short description of the mission 05",
  }),
  longDescription: defineMessage({
    id: "missions.mission-05.longDescription",
    defaultMessage:
      "In Mission 5 we need your help to stress-test the Network infrastructure. By performing various activities and pushing the limits of the testnet, you will play a crucial role in identifying and resolving any potential bottlenecks or vulnerabilities. Your efforts will ensure that the Verida mainnet operates at its full potential, providing a reliable and efficient decentralized storage solution.",
    description: "Long description of the mission 05",
  }),
};

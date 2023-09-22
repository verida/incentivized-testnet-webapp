import { defineMessage } from "react-intl";

import type { Mission } from "~/features/activity/types";

export const MISSION_04_ID = "mission-04";

export const mission: Mission = {
  id: MISSION_04_ID,
  idLabel: defineMessage({
    id: "missions.mission-04.idLabel",
    defaultMessage: "Mission 4",
    description: "Label of the mission id 04",
  }),
  enabled: false,
  visible: true,
  frozen: false,
  order: 4,
  title: defineMessage({
    id: "missions.mission-04.title",
    defaultMessage: "Stress testing the network",
    description: "Title of the mission 04",
  }),
  shortDescription: defineMessage({
    id: "missions.mission-04.shortDescription",
    defaultMessage:
      "In Mission 4 we need your help to stress-test the Network infrastructure. By performing various activities and pushing the limits of the testnet, you will play a crucial role in identifying and resolving any potential bottlenecks or vulnerabilities. Your efforts will ensure that the Verida mainnet operates at its full potential, providing a reliable and efficient decentralized storage solution.",
    description: "Short description of the mission 04",
  }),
  longDescription: defineMessage({
    id: "missions.mission-04.longDescription",
    defaultMessage:
      "In Mission 4 we need your help to stress-test the Network infrastructure. By performing various activities and pushing the limits of the testnet, you will play a crucial role in identifying and resolving any potential bottlenecks or vulnerabilities. Your efforts will ensure that the Verida mainnet operates at its full potential, providing a reliable and efficient decentralized storage solution.",
    description: "Long description of the mission 04",
  }),
};

import { defineMessage } from "react-intl";

import type { Mission } from "~/features/activity/types";

export const MISSION_02_ID = "mission-02";

export const mission: Mission = {
  id: MISSION_02_ID,
  enabled: false,
  visible: true,
  order: 2,
  title: defineMessage({
    id: "missions.mission-02.title",
    defaultMessage: "Mission 2: Stress testing the network",
    description: "Title of the mission 02",
  }),
  shortDescription: defineMessage({
    id: "missions.mission-02.shortDescription",
    defaultMessage:
      "In Mission 2 we need your help to stress-test the network infrastructure. By performing various activities and pushing the limits of the testnet, you will play a crucial role in identifying and resolving any potential bottlenecks or vulnerabilities. Your efforts will ensure that the Verida mainnet operates at its full potential, providing a reliable and efficient decentralized storage solution.",
    description: "Short description of the mission 02",
  }),
};

import { defineMessage } from "react-intl";

import type { Mission } from "~/features/activity/types";

export const MISSION_01_ID = "mission-01";

export const mission: Mission = {
  id: MISSION_01_ID,
  idLabel: defineMessage({
    id: "missions.mission-01.idLabel",
    defaultMessage: "Mission 1",
    description: "Label of the mission if 01",
  }),
  enabled: true,
  visible: true,
  order: 1,
  title: defineMessage({
    id: "missions.mission-01.title",
    defaultMessage: "Onboarding to the Verida Network",
    description: "Title of the mission 01",
  }),
  shortDescription: defineMessage({
    id: "missions.mission-01.shortDescription",
    defaultMessage:
      "This first mission guides you through the process of onboarding onto the Verida network. It's designed to familiarize you with the network's features, functionalities, and ecosystem, ensuring you have a smooth and seamless experience as a Verida user.",
    description: "Short description of the mission 01",
  }),
};

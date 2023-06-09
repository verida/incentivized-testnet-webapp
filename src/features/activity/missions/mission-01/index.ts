import { defineMessage } from "react-intl";

import type { Mission } from "~/features/activity/types";

export const MISSION_01_ID = "mission-01";

export const mission: Mission = {
  id: MISSION_01_ID,
  enabled: true,
  visible: true,
  order: 1,
  title: defineMessage({
    id: "missions.mission-01.title",
    defaultMessage: "Mission 1: Onboarding to the Verida Network",
    description: "Title of the mission 01",
  }),
  shortDescription: defineMessage({
    id: "missions.mission-01.shortDescription",
    defaultMessage:
      "This first mission guides you through the process of onboarding onto the Verida network. It's designed to familiarize you with the network's features, functionalities, and ecosystem, ensuring you have a smooth and seamless experience as a Verida user.",
    description: "Short description of the mission 01",
  }),
};

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
      "This first mission guides you through the process of onboarding onto the Verida Network. It's designed to familiarize you with the Network's features, functionalities, and ecosystem, ensuring you have a smooth and seamless experience as a Verida user.{newline}{newline}Get Started:{newline}1. Click the 'Connect' button above{newline}2. Depending on being on mobile or desktop, either click the button, or scan the QR code with your phone{newline}3. Follow the instructions to install the Wallet and create your Identity{newline}4. You may have to refresh this page and connect again",
    description: "Short description of the mission 01",
  }),
  longDescription: defineMessage({
    id: "missions.mission-01.longDescription",
    defaultMessage:
      "This first mission guides you through the process of onboarding onto the Verida Network. It's designed to familiarize you with the Network's features, functionalities, and ecosystem, ensuring you have a smooth and seamless experience as a Verida user.",
    description: "Long description of the mission 01",
  }),
};

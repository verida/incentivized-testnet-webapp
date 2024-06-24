import { defineMessage } from "react-intl";

import type { Mission } from "~/features/missions/types";

export const MISSION_03_ID = "3";

export const mission: Mission = {
  id: MISSION_03_ID,
  idLabel: defineMessage({
    id: "missions.mission-03.idLabel",
    defaultMessage: "Mission 3",
    description: "Label of the mission id 03",
  }),
  enabled: true,
  visible: true,
  frozen: false,
  order: 3,
  title: defineMessage({
    id: "missions.mission-03.title",
    defaultMessage:
      "Craft Your Unique Web3 Gaming Identity with Gamer31 ZK Credentials",
    description: "Title of the mission 03",
  }),
  description: defineMessage({
    id: "missions.mission-03.description",
    defaultMessage:
      "Gamer31 is on a mission to redefine how gamers establish their identities and reputation. Combined with Verida's web3 wallet and database storage network, don't miss this opportunity to claim your gaming ZK Polygon ID credentials and build your private gaming identity for web3.",
    description: "Short description of the mission 03",
  }),
  longDescription: defineMessage({
    id: "missions.mission-03.longDescription",
    defaultMessage:
      "Gamer31 is on a mission to redefine how gamers establish their identities and reputation. Combined with Verida's web3 wallet and database storage network, don't miss this opportunity to claim your gaming ZK Polygon ID credentials and build your private gaming identity for web3.",
    description: "Long description of the mission 03",
  }),
  resources: [],
};

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
    defaultMessage: "Gamer31",
    description: "Title of the mission 03",
  }),
  shortDescription: defineMessage({
    id: "missions.mission-03.shortDescription",
    defaultMessage: "Gamer31",
    description: "Short description of the mission 03",
  }),
  longDescription: defineMessage({
    id: "missions.mission-03.longDescription",
    defaultMessage: "Gamer31",
    description: "Long description of the mission 03",
  }),
};

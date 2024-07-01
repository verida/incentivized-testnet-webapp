import { config } from "~/config";

import { mission as mission01 } from "./mission-01";
import { mission as mission02 } from "./mission-02";
import { mission as mission03 } from "./mission-03";
import { mission as mission04 } from "./mission-04";
import { mission as mission05 } from "./mission-05";
import { mission as mission06 } from "./mission-06";

export const ONBOARDING_MISSION = mission01;

export { MISSION_01_ID } from "./mission-01";
export { MISSION_02_ID } from "./mission-02";
export { MISSION_03_ID } from "./mission-03";
export { MISSION_04_ID } from "./mission-04";
export { MISSION_05_ID } from "./mission-05";
export { MISSION_06_ID } from "./mission-06";

export const missions = [
  mission01,
  mission02,
  mission03,
  mission04,
  mission05,
  mission06,
]
  .filter((mission) => (config.devMode ? true : mission.visible))
  .sort((a, b) => a.order - b.order);

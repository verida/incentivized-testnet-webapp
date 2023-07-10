import { mission as mission01 } from "./mission-01";
import { mission as mission02 } from "./mission-02";
import { mission as mission03 } from "./mission-03";

export { MISSION_01_ID } from "./mission-01";
export { MISSION_02_ID } from "./mission-02";
export { MISSION_03_ID } from "./mission-03";

export const missions = [mission01, mission02, mission03].sort(
  (a, b) => a.order - b.order
);

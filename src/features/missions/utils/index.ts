import { MISSION_01_ID } from "~/features/missions/constants";

export function isOnboardingMission(missionId: string) {
  return missionId === MISSION_01_ID;
}

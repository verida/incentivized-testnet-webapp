import { MISSION_01_ID, missions } from "~/features/missions/constants";

export function getMissionById(missionId: string) {
  return missions.find((mission) => mission.id === missionId);
}

export function isOnboardingMission(missionId: string) {
  return missionId === MISSION_01_ID;
}

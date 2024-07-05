import { ONBOARDING_MISSION, missions } from "~/features/missions/constants";

export function getMissionById(missionId: string) {
  return missions.find((mission) => mission.id === missionId);
}

export function isOnboardingMission(missionId: string) {
  return missionId === ONBOARDING_MISSION.id;
}

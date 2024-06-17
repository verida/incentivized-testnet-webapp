import { useMemo } from "react";

import {
  activities as allActivities,
  missions as allMissions,
} from "~/features/activity";
import { partners } from "~/features/partners/constants";

export function usePartner(partnerId: string) {
  const partner = useMemo(() => {
    return partners.find((item) => item.id === partnerId);
  }, [partnerId]);

  const activities = useMemo(() => {
    return allActivities.filter(
      (item) =>
        item.enabled &&
        item.visible &&
        item.partners?.find((_partnerId) => _partnerId === partnerId)
    );
  }, [partnerId]);

  const missions = useMemo(() => {
    let missionIds = activities.map((activity) => activity.missionId);
    // Remove duplicated mission ids
    missionIds = [...new Set(missionIds)];

    return allMissions
      .filter((item) => missionIds.includes(item.id))
      .sort((a, b) => a.order - b.order);
  }, [activities]);

  return {
    partner,
    activities,
    missions,
  };
}

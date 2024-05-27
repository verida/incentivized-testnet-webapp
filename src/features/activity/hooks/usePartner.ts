import { useEffect, useState } from "react";

import { activities as wholeActivities } from "~/features/activity/activities";
import { missions as wholeMissions } from "~/features/activity/missions";
import { partners } from "~/features/activity/partners";
import { Activity, Partner, PartnerMission } from "~/features/activity/types";

export default function usePartner(partner_id: string) {
  const [partner, setPartner] = useState<Partner>();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [missions, setMissions] = useState<PartnerMission[]>([]);

  useEffect(() => {
    setPartner(partners.find((item) => item.id === partner_id));
    const _activities = wholeActivities.filter(
      (item) => item.partner === partner_id
    );
    setActivities(_activities);

    let missionIds = _activities.map((activity) => activity.missionId);
    // Remove duplicated mission ids
    missionIds = [...new Set(missionIds)];

    const _missions = missionIds.reduce<PartnerMission[]>(
      (accumulator, currentValue) => {
        // Get regular mission
        const mission = wholeMissions.find((item) => item.id === currentValue);
        // Get partner ids for activities of this mission
        const _partnerIds = _activities
          .filter((activity) => activity.id === currentValue)
          .map((activity) => activity.partner);

        if (mission) {
          const partnerIds = _partnerIds.reduce<string[]>((array, value) => {
            if (value) {
              array.push(value);
            }
            return array;
          }, []);

          accumulator.push({
            ...mission,
            partners: partnerIds,
          });
        }
        return accumulator;
      },
      []
    );

    setMissions(_missions);
  }, [partner_id]);

  return {
    partner,
    activities,
    missions,
  };
}

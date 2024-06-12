import { useEffect, useState } from "react";

import {
  Activity,
  activities as wholeActivities,
  missions as wholeMissions,
} from "~/features/activity";
import { partners } from "~/features/partners/constants";
import { Partner, PartnerMission } from "~/features/partners/types";

export function usePartner(partner_id: string) {
  const [partner, setPartner] = useState<Partner | undefined>();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [missions, setMissions] = useState<PartnerMission[]>([]);

  useEffect(() => {
    setPartner(partners.find((item) => item.id === partner_id));
    const _activities = wholeActivities.filter(
      (item) =>
        item.enabled &&
        item.visible &&
        item.partners?.find((_partnerId) => _partnerId === partner_id)
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
        let _partnerIds: string[] = [];
        _activities
          .filter((activity) => activity.missionId === currentValue)
          .map((activity) => {
            if (activity.partners) {
              _partnerIds = _partnerIds.concat(activity.partners);
            }
            return true;
          });
        _partnerIds = [...new Set(_partnerIds)];

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

import React, { useMemo } from "react";
import { useIntl } from "react-intl";

import { Typography } from "~/components/atoms";
import { HomeOnboardingMissionCard } from "~/components/organisms";
import { useActivity } from "~/features/activity";
import { MISSION_01_ID, Mission } from "~/features/missions";

export type HomeMissionBeginSectionProps = {
  missions: Mission[];
} & React.ComponentPropsWithRef<"article">;

export const HomeMissionBeginSection: React.FC<HomeMissionBeginSectionProps> = (
  props
) => {
  const { missions } = props;

  const i18n = useIntl();

  const {
    activities: allActivities,
    isLoadingUserActivities,
    getUserActivity,
  } = useActivity();

  const onboardingActivities = useMemo(
    () =>
      allActivities.filter(
        (activity) => activity.missionId === MISSION_01_ID && activity.visible
      ),
    [allActivities]
  );

  const activityStatuses = useMemo(() => {
    return onboardingActivities.map((activity) => {
      const userActivity = getUserActivity(activity.id);
      return userActivity?.status ?? "todo";
    });
  }, [onboardingActivities, getUserActivity]);

  const beginMissionsLabel = i18n.formatMessage({
    id: "HomeMissionBeginSection.beginMissionsLabel",
    defaultMessage: "Begin Your Journey",
    description: "Label for Home Onboarding Card",
  });

  return (
    <article>
      <Typography variant={"heading-m"} className="mb-6">
        {beginMissionsLabel}
      </Typography>
      <HomeOnboardingMissionCard
        mission={missions[0]}
        activities={onboardingActivities}
        isLoadingUserActivities={isLoadingUserActivities}
        activityStatuses={activityStatuses}
        displayGoToMissionButton
      />
    </article>
  );
};

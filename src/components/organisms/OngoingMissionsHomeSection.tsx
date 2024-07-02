import React, { useMemo } from "react";
import { useIntl } from "react-intl";

import { OngoingMissionCardsCarousel } from "~/components/organisms/OngoingMissionCardsCarousel";
import { HomeSectionWrapper } from "~/components/templates";
import {
  isMissionCompleted,
  isMissionStarted,
  sortMissionsByCompletionPercentage,
  useActivity,
} from "~/features/activity";
import { isOnboardingMission, missions } from "~/features/missions";

export type OngoingMissionsHomeSectionProps = Omit<
  React.ComponentPropsWithRef<typeof HomeSectionWrapper>,
  "title" | "children"
>;

export const OngoingMissionsHomeSection: React.FC<
  OngoingMissionsHomeSectionProps
> = (props) => {
  const { ...wrapperProps } = props;

  const { activities, userActivities, isLoadingUserActivities } = useActivity();

  const i18n = useIntl();

  const title = i18n.formatMessage({
    id: "OngoingMissionsHomeSection.title",
    defaultMessage: "Continue where you left of",
    description: "Title of the on going missions section on the home page",
  });

  const onGoingMissions = useMemo(() => {
    if (isLoadingUserActivities) {
      return [];
    }

    const filteredMissions = missions
      .filter(
        // Filter out the onboarding mission
        (mission) => !isOnboardingMission(mission.id)
      )
      .filter(
        // Filter out completed missions
        (mission) => !isMissionCompleted(activities, userActivities, mission.id)
      )
      .filter(
        // Filter out missions not started yet
        (mission) => !isMissionStarted(activities, userActivities, mission.id)
      );

    const sortedMissions = sortMissionsByCompletionPercentage(
      activities,
      userActivities,
      filteredMissions
    );

    return sortedMissions;
  }, [isLoadingUserActivities, activities, userActivities]);

  if (onGoingMissions.length === 0) {
    return null;
  }

  return (
    <HomeSectionWrapper {...wrapperProps} title={title}>
      <OngoingMissionCardsCarousel missions={onGoingMissions} />
    </HomeSectionWrapper>
  );
};

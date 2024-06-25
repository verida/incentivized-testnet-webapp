import { useMemo } from "react";
import { useIntl } from "react-intl";

import { ButtonLink, Typography } from "~/components/atoms";
import {
  LegacyMissionProgressBar,
  StackedImage,
  XpPointsChip,
} from "~/components/molecules";
import { activities, useActivity } from "~/features/activity";
import { Mission } from "~/features/missions";
import { partners as allPartners } from "~/features/partners";

export type HomeContinueMissionCardProps = {
  mission: Mission;
} & Omit<React.ComponentPropsWithRef<"article">, "children">;

export const HomeContinueMissionCard: React.FC<HomeContinueMissionCardProps> = (
  props
) => {
  const { mission, ...divProps } = props;

  const {
    activities: allActivities,
    isLoadingUserActivities,
    getUserActivity,
  } = useActivity();

  const missionActivities = useMemo(
    () =>
      allActivities.filter(
        (activity) => activity.missionId === mission.id && activity.visible
      ),
    [allActivities]
  );

  const activityStatuses = useMemo(() => {
    return missionActivities.map((activity) => {
      const userActivity = getUserActivity(activity.id);
      return userActivity?.status ?? "todo";
    });
  }, [missionActivities, getUserActivity]);

  const totalMissionXpPoints = useMemo(
    () =>
      activities.reduce(
        (totalXpPoints, activity) => totalXpPoints + activity.points,
        0
      ),
    [activities]
  );

  const partners = useMemo(() => {
    const partnerIds = new Set(
      missionActivities.flatMap((activity) => activity.partners)
    );
    return allPartners.filter((partner) => partnerIds.has(partner.id));
  }, [missionActivities]);

  const i18n = useIntl();

  const continueMissionButtonLabel = i18n.formatMessage({
    id: "HomeContinueMissionCard.continueMissionButtonLabel",
    description:
      "Label of the button on the Mission card to open the mission page",
    defaultMessage: "Continue",
  });

  return (
    <article {...divProps}>
      <div className="flex flex-col bg-transparent-5 clip-padding rounded-xl p-6 h-full">
        <div className="flex justify-between mb-6">
          <XpPointsChip nbXpPoints={totalMissionXpPoints} />
          <StackedImage
            images={partners.map((partner) => partner.logo || "")}
          />
        </div>
        <Typography className="mb-8">
          {i18n.formatMessage(mission.title)}
        </Typography>
        <div className="flex flex-col sm:flex-row justify-between items-end grow">
          <LegacyMissionProgressBar
            isLoading={isLoadingUserActivities}
            statuses={activityStatuses}
          />
          <ButtonLink
            href={`/missions/${mission.id}`}
            internal
            className="text-background bg-white hover:bg-white/90 py-3.5"
            // TODO: Create button colour variant
          >
            {continueMissionButtonLabel}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
};

import { useMemo } from "react";
import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { Typography } from "~/components/atoms";
import {
  MissionCardActivitiesProgressBar,
  StackedImage,
  XpPointsBadge,
  XpPointsChip,
} from "~/components/molecules";
import { useActivity } from "~/features/activity";
import {
  Mission,
  isOnboardingMission as isOnboardingMissionFunc,
} from "~/features/missions";
import { partners as allPartners } from "~/features/partners";
import { useVerida } from "~/features/verida";

export type MissionCardProps = {
  mission: Mission;
} & Omit<React.ComponentPropsWithRef<"article">, "children">;

export const MissionCard: React.FC<MissionCardProps> = (props) => {
  const { mission, className, ...articleProps } = props;

  const isOnboardingMission = isOnboardingMissionFunc(mission.id);

  const { isConnected, isConnecting } = useVerida();

  const { isLoadingUserActivities, activities, getUserActivity } =
    useActivity();

  const missionActivities = useMemo(
    () =>
      activities.filter(
        (activity) =>
          activity.enabled &&
          activity.visible &&
          activity.missionId === mission.id
      ),
    [activities, mission]
  );

  const activityStatuses = useMemo(() => {
    return missionActivities.map((activity) => {
      const userActivity = getUserActivity(activity.id);
      return userActivity?.status ?? "todo";
    });
  }, [missionActivities, getUserActivity]);

  const totalMissionPoints = useMemo(
    () =>
      missionActivities?.reduce(
        (totalXpPoints, activity) => totalXpPoints + activity.points,
        0
      ) ?? 0,
    [missionActivities]
  );

  const partners = useMemo(() => {
    const partnerIds = new Set(
      missionActivities.flatMap((activity) => activity.partners)
    );
    return allPartners.filter((partner) => partnerIds.has(partner.id));
  }, [missionActivities]);

  const i18n = useIntl();

  const missionLabel = i18n.formatMessage(mission.title);

  return (
    <article
      className={twMerge(
        "border border-border bg-clip-padding rounded-xl h-full flex flex-col justify-start hover:shadow-3xl",
        isOnboardingMission ? "bg-mission-onboarding" : "bg-mission-default",
        className
      )}
      {...articleProps}
    >
      <div className="p-4 flex flex-col items-stretch">
        <div className="flex justify-center">
          <XpPointsBadge
            nbXpPoints={totalMissionPoints}
            theme={isOnboardingMission ? "onboarding" : "default"}
            className="w-40"
          />
        </div>
        <MissionCardActivitiesProgressBar
          isLoading={isConnecting || (isConnected && isLoadingUserActivities)}
          activityStatuses={activityStatuses}
        />
      </div>
      <div className="py-6 px-4 rounded-[calc(0.75rem_-_1px)] bg-background-light/90 flex-grow flex flex-col justify-between gap-6">
        <Typography variant="heading-s" component="p" className="line-clamp-3">
          {missionLabel}
        </Typography>
        <div className="flex flex-row justify-between items-center">
          <XpPointsChip nbXpPoints={totalMissionPoints} />
          <StackedImage
            images={partners.map((partner) => partner.logo || "")}
          />
        </div>
      </div>
    </article>
  );
};

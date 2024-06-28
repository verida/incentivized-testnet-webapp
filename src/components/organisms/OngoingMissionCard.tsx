import { useMemo } from "react";
import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { ButtonLink, Typography } from "~/components/atoms";
import {
  MissionActivitiesProgressBar,
  StackedImage,
  XpPointsChip,
} from "~/components/molecules";
import { useActivity } from "~/features/activity";
import { Mission } from "~/features/missions";
import { partners as allPartners } from "~/features/partners";

export type OngoingMissionCardProps = {
  mission: Mission;
} & Omit<React.ComponentPropsWithRef<"article">, "children">;

export const OngoingMissionCard: React.FC<OngoingMissionCardProps> = (
  props
) => {
  const { mission, className, ...articleProps } = props;

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
    [allActivities, mission.id]
  );

  const activityStatuses = useMemo(() => {
    return missionActivities.map((activity) => {
      const userActivity = getUserActivity(activity.id);
      return userActivity?.status ?? "todo";
    });
  }, [missionActivities, getUserActivity]);

  const nbActivities = activityStatuses.length;
  const nbCompletedActivities = activityStatuses.filter(
    (status) => status === "completed"
  ).length;

  const totalMissionXpPoints = useMemo(
    () =>
      missionActivities.reduce(
        (totalXpPoints, activity) => totalXpPoints + activity.points,
        0
      ),
    [missionActivities]
  );

  const partners = useMemo(() => {
    const partnerIds = new Set(
      missionActivities.flatMap((activity) => activity.partners)
    );
    return allPartners.filter((partner) => partnerIds.has(partner.id));
  }, [missionActivities]);

  const i18n = useIntl();

  const shortProgressMessage = i18n.formatMessage(
    {
      id: "OngoingMissionCard.shortProgressMessage",
      defaultMessage: `{nbCompletedActivities, number}/{nbActivities, number}`,
      description:
        "Short message for the progress bar on the ongoing mission card",
    },
    {
      nbCompletedActivities,
      nbActivities,
    }
  );

  const longProgressMessage = i18n.formatMessage(
    {
      id: "OngoingMissionCard.longProgressMessage",
      defaultMessage: `{nbCompletedActivities, number} of {nbActivities, number} {nbActivities, plural,
        one {activity}
        other {activities}
      } completed`,
      description:
        "Long message for the progress bar on the ongoing mission card",
    },
    {
      nbCompletedActivities,
      nbActivities,
    }
  );

  const continueMissionButtonLabel = i18n.formatMessage({
    id: "OngoingMissionCard.continueMissionButtonLabel",
    description:
      "Label of the button on the ongoing mission card to open the mission page",
    defaultMessage: "Continue",
  });

  return (
    <article
      {...articleProps}
      className={twMerge(
        "bg-transparent-5 rounded-xl border border-border p-6 h-full",
        className
      )}
    >
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-row justify-between">
          <XpPointsChip nbXpPoints={totalMissionXpPoints} />
          <StackedImage
            images={partners.map((partner) => partner.logo || "")}
          />
        </div>
        <div className="min-h-20 flex-grow">
          <Typography variant="heading-s" className="line-clamp-3">
            {i18n.formatMessage(mission.title)}
          </Typography>
        </div>
        <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-4">
          <div className="lg:basis-1/2 w-full flex flex-row lg:flex-col gap-2 items-center lg:items-start">
            <Typography variant="base-s" className="hidden lg:block">
              {longProgressMessage}
            </Typography>
            <MissionActivitiesProgressBar
              isLoading={isLoadingUserActivities}
              activityStatuses={activityStatuses}
              className="flex-1 lg:self-stretch"
            />
            <Typography variant="base-s" className="lg:hidden">
              {shortProgressMessage}
            </Typography>
          </div>
          <div className="lg:basis-1/3">
            <ButtonLink
              href={`/missions/${mission.id}`}
              variant="contained"
              color="primary"
              internal
              className="w-full"
            >
              {continueMissionButtonLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
    </article>
  );
};

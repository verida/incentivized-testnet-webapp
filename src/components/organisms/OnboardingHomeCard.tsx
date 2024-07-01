import { useMemo } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { ButtonLink, Typography } from "~/components/atoms";
import {
  CollapsibleList,
  MissionActivitiesProgressBar,
  XpPointsBadge,
} from "~/components/molecules";
import { ActivityListItem } from "~/components/organisms/ActivityListItem";
import {
  Activity,
  UserActivityStatus,
  getActivitiesForMission,
  useActivity,
} from "~/features/activity";
import { ONBOARDING_MISSION } from "~/features/missions";

export type OnboardingHomeCardProps = Omit<
  React.ComponentPropsWithRef<"div">,
  "children"
>;

export const OnboardingHomeCard: React.FC<OnboardingHomeCardProps> = (
  props
) => {
  const { ...divProps } = props;

  const {
    activities: allActivities,
    isLoadingUserActivities,
    getUserActivity,
  } = useActivity();

  const onboardingActivities: Activity[] = useMemo(
    () => getActivitiesForMission(allActivities, ONBOARDING_MISSION.id),
    [allActivities]
  );

  const activityStatuses: UserActivityStatus[] = useMemo(() => {
    return onboardingActivities.map((activity) => {
      const userActivity = getUserActivity(activity.id);
      return userActivity?.status ?? "todo";
    });
  }, [onboardingActivities, getUserActivity]);

  const nbActivities: number = useMemo(
    () => activityStatuses.length,
    [activityStatuses]
  );

  const nbCompletedActivities: number = useMemo(
    () => activityStatuses.filter((status) => status === "completed").length,
    [activityStatuses]
  );

  const totalMissionXpPoints: number = useMemo(
    () =>
      onboardingActivities.reduce(
        (totalXpPoints, activity) => totalXpPoints + activity.points,
        0
      ),
    [onboardingActivities]
  );

  const i18n = useIntl();

  const gotToMissionButtonLabel = i18n.formatMessage({
    id: "OnboardingHomeCard.gotToMissionButtonLabel",
    description:
      "Label of the button on the Mission card to open the mission page",
    defaultMessage: "Go to Mission",
  });

  const resolvedActivityListMessage = i18n.formatMessage({
    id: "OnboardingHomeCard.defaultActivityListMessage",
    description:
      "Default message displayed above the activity list in the mission card",
    defaultMessage: "Activities",
  });

  const shortProgressMessage = i18n.formatMessage(
    {
      id: "OnboardingHomeCard.shortProgressMessage",
      defaultMessage: `{nbCompletedActivities, number}/{nbActivities, number}`,
      description:
        "Short message for the progress bar on the onboarding home card",
    },
    {
      nbCompletedActivities,
      nbActivities,
    }
  );

  const longProgressMessage = i18n.formatMessage(
    {
      id: "OnboardingHomeCard.longProgressMessage",
      defaultMessage: `{nbCompletedActivities, number} of {nbActivities, number} {nbActivities, plural,
        one {activity}
        other {activities}
      } completed`,
      description:
        "Long message for the progress bar on the onboarding home card",
    },
    {
      nbCompletedActivities,
      nbActivities,
    }
  );

  return (
    <div {...divProps}>
      <div
        className="rounded-xl p-px"
        style={{
          background: `linear-gradient(110deg, hsla(var(--secondary) / 0.9) 10%, hsla(var(--white) / 0.15) 90%)`,
        }}
      >
        <div
          className="rounded-[calc(0.75rem_-_1px)] flex flex-row"
          style={{
            background:
              "linear-gradient(110deg, hsla(var(--background) / 0.9) 10%, hsla(var(--background) / 1) 90%)",
          }}
        >
          <div className="px-4 py-6 lg:px-10 lg:py-12 w-full lg:basis-1/2">
            <div className="flex flex-row gap-3 lg:gap-6 lg:h-80">
              <XpPointsBadge
                nbXpPoints={totalMissionXpPoints}
                theme="onboarding"
                className="rounded-xl bg-mission-onboarding flex flex-row items-center min-w-20 w-full max-w-52"
              />
              <div className="flex-1 flex flex-col gap-6 justify-between">
                <div className="flex flex-col gap-3">
                  <Typography variant="heading-m" className="line-clamp-2">
                    {i18n.formatMessage(ONBOARDING_MISSION.title)}
                  </Typography>
                  <div className="hidden sm:block">
                    <Typography
                      variant="base-s"
                      className="text-muted-foreground line-clamp-3"
                    >
                      {i18n.formatMessage(ONBOARDING_MISSION.description, {
                        newline: (
                          <>
                            <br />
                          </>
                        ),
                      })}
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <div className="w-full flex flex-row lg:flex-col gap-2 items-center lg:items-start">
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
                  <ButtonLink
                    href={`/missions/${ONBOARDING_MISSION.id}`}
                    internal
                    color="primary"
                    className="w-full"
                  >
                    {gotToMissionButtonLabel}
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4 py-6 lg:px-10 lg:py-12 rounded-r-[calc(0.75rem_-_1px)] hidden basis-1/2 lg:flex flex-col gap-3 bg-background/95">
            <Typography variant="base" className="text-muted-foreground">
              {resolvedActivityListMessage}
            </Typography>
            <CollapsibleList listClassName="gap-3" nbItemWhenCollapsed={3}>
              {onboardingActivities.map((activity, index) => (
                <li key={activity.id}>
                  <Link to={`/activities/${activity.id}`}>
                    <ActivityListItem
                      activity={activity}
                      activityIndex={index + 1}
                      hidePartners
                      hideXpPoints
                      size="small"
                    />
                  </Link>
                </li>
              ))}
            </CollapsibleList>
          </div>
        </div>
      </div>
    </div>
  );
};

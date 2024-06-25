import { useMemo } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { ButtonLink, Typography } from "~/components/atoms";
import {
  CollapsibleList,
  LegacyMissionProgressBar,
  XpPointsBadge,
} from "~/components/molecules";
import { ActivityListItem } from "~/components/organisms";
import { useActivity } from "~/features/activity";
import { Mission } from "~/features/missions";

export type HomeOnboardingMissionCardProps = {
  mission: Mission;
  hideDescription?: boolean;
  displayGoToMissionButton?: boolean;
  hidePartnersOnActivities?: boolean;
} & Omit<React.ComponentPropsWithRef<"article">, "children">;

export const HomeOnboardingMissionCard: React.FC<
  HomeOnboardingMissionCardProps
> = (props) => {
  const {
    mission,
    hideDescription = false,
    displayGoToMissionButton = false,
    hidePartnersOnActivities = false,
    ...divProps
  } = props;

  const {
    activities: allActivities,
    isLoadingUserActivities,
    getUserActivity,
  } = useActivity();

  const onboardingActivities = useMemo(
    () =>
      allActivities.filter(
        (activity) => activity.missionId === mission.id && activity.visible
      ),
    [allActivities, mission.id]
  );

  const activityStatuses = useMemo(() => {
    return onboardingActivities.map((activity) => {
      const userActivity = getUserActivity(activity.id);
      return userActivity?.status ?? "todo";
    });
  }, [onboardingActivities, getUserActivity]);

  const totalMissionXpPoints = useMemo(
    () =>
      onboardingActivities.reduce(
        (totalXpPoints, activity) => totalXpPoints + activity.points,
        0
      ),
    [onboardingActivities]
  );

  const i18n = useIntl();

  const startMissionButtonLabel = i18n.formatMessage({
    id: "HomeOnboardingMissionCard.startMissionButtonLabel",
    description:
      "Label of the button on the Mission card to open the mission page",
    defaultMessage: "Start Mission",
  });

  const resolvedActivityListMessage = i18n.formatMessage({
    id: "HomeOnboardingMissionCard.defaultActivityListMessage",
    description:
      "Default message displayed above the activity list in the mission card",
    defaultMessage: "Activities",
  });

  return (
    <article {...divProps}>
      <div
        className="relative flex bg-clip-padding rounded-xl p-px"
        style={{
          background:
            "linear-gradient(129deg, hsl(var(--secondary)) 1.09%, hsl(var(--secondary) / 0) 98.84%",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full border border-border rounded-xl pointer-events-none" />
        <section className="px-4 py-6 lg:px-10 lg:py-12 w-full lg:basis-1/2 rounded-[calc(0.75rem_-_1px)] rounded-e-none bg-background/90">
          <div className="flex flex-row gap-3 lg:gap-6 h-full max-h-80">
            <div className="flex rounded-xl items-center bg-mission-onboarding">
              <XpPointsBadge
                nbXpPoints={totalMissionXpPoints}
                theme="onboarding"
                className="w-28 lg:w-56"
              />
            </div>
            <div className="flex flex-col items-start gap-3 w-full">
              <div className="grow">
                <Typography variant="heading-m">
                  {i18n.formatMessage(mission.title)}
                </Typography>
                {!hideDescription && (
                  <Typography
                    variant="base-s"
                    className="hidden lg:block text-gray mt-3"
                  >
                    {i18n.formatMessage(mission.description)}
                  </Typography>
                )}
              </div>
              <div className="w-full">
                <LegacyMissionProgressBar
                  isLoading={isLoadingUserActivities}
                  statuses={activityStatuses}
                  small
                />
              </div>
              {displayGoToMissionButton && (
                <ButtonLink
                  href={`/missions/${mission.id}`}
                  internal
                  className="text-background bg-white hover:bg-white/90"
                  size={"large"}
                  // TODO: Create button colour variant
                >
                  {startMissionButtonLabel}
                </ButtonLink>
              )}
            </div>
          </div>
        </section>
        <section className="px-4 py-6 lg:px-10 lg:py-12 hidden lg:flex flex-col basis-1/2 gap-6 rounded-[calc(0.75rem_-_1px)] rounded-s-none bg-background/95">
          <Typography variant="base">{resolvedActivityListMessage}</Typography>
          <CollapsibleList className="flex flex-col gap-6">
            {onboardingActivities.map((activity, index) => (
              <li key={activity.id}>
                <Link to={`/activities/${activity.id}`}>
                  <ActivityListItem
                    activity={activity}
                    activityIndex={index + 1}
                    showPartners={!hidePartnersOnActivities}
                    hideXpPoints
                    small
                  />
                </Link>
              </li>
            ))}
          </CollapsibleList>
        </section>
      </div>
    </article>
  );
};

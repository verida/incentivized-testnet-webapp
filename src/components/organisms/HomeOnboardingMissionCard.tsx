import { useMemo } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { ButtonLink, Typography } from "~/components/atoms";
import {
  LegacyMissionProgressBar,
  XpPointsBadge,
} from "~/components/molecules";
import { ActivityListItem } from "~/components/organisms";
import { Activity, UserActivityStatus } from "~/features/activity";
import {
  Mission,
  isOnboardingMission as isOnboardingMissionFunc,
} from "~/features/missions";

export type HomeOnboardingMissionCardProps = {
  mission: Mission;
  activities: Activity[];
  /* Allow overriding the default message if needed */
  activityListMessage?: string;
  activityStatuses: UserActivityStatus[];
  isLoadingUserActivities?: boolean;
  hideDescription?: boolean;
  hideTotalMissionXpPoints?: boolean;
  displayGoToMissionButton?: boolean;
  hidePartnersOnActivities?: boolean;
} & Omit<React.ComponentPropsWithRef<"article">, "children">;

export const HomeOnboardingMissionCard: React.FC<
  HomeOnboardingMissionCardProps
> = (props) => {
  const {
    mission,
    activities,
    activityListMessage,
    activityStatuses,
    isLoadingUserActivities,
    hideDescription = false,
    hideTotalMissionXpPoints = false,
    displayGoToMissionButton = false,
    hidePartnersOnActivities = false,
    ...divProps
  } = props;

  const isOnboardingMission = isOnboardingMissionFunc(mission.id);

  const totalMissionXpPoints = useMemo(
    () =>
      activities.reduce(
        (totalXpPoints, activity) => totalXpPoints + activity.points,
        0
      ),
    [activities]
  );

  const i18n = useIntl();

  const startMissionButtonLabel = i18n.formatMessage({
    id: "MissionHomeCard.startMissionButtonLabel",
    description:
      "Label of the button on the Mission card to open the mission page",
    defaultMessage: "Start Mission",
  });

  const resolvedActivityListMessage = i18n.formatMessage({
    id: "MissionHomeCard.defaultActivityListMessage",
    description:
      "Default message displayed above the activity list in the mission card",
    defaultMessage: "Activities",
  });

  return (
    <article {...divProps}>
      <div
        className="relative flex bg-clip-padding rounded-2xl p-px"
        style={{
          background:
            "linear-gradient(129deg, hsl(var(--secondary)) 1.09%, hsl(var(--secondary) / 0) 98.84%",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full border border-border rounded-2xl pointer-events-none" />
        <section className="px-4 py-6 lg:px-10 lg:py-12 flex flex-row w-full lg:basis-1/2 gap-3 lg:gap-6 rounded-[calc(1rem_-_1px)] rounded-e-none bg-background/90">
          <div
            className={twMerge(
              "flex rounded-2xl items-center",
              isOnboardingMission
                ? "bg-mission-onboarding"
                : "bg-mission-default"
            )}
          >
            <XpPointsBadge
              nbXpPoints={totalMissionXpPoints}
              theme={isOnboardingMission ? "onboarding" : "default"}
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
        </section>
        <section className="px-4 py-6 lg:px-10 lg:py-12 hidden lg:flex flex-col basis-1/2 gap-6 rounded-[calc(1rem_-_1px)] rounded-s-none bg-background/95">
          <Typography variant="base">{resolvedActivityListMessage}</Typography>
          <ul className="flex flex-col gap-6">
            {activities.map((activity, index) => (
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
          </ul>
        </section>
      </div>
    </article>
  );
};

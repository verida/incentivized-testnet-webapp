import { useMemo } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { ButtonLink, ExternalLink, Typography } from "~/components/atoms";
import { XpPointsBadge } from "~/components/molecules";
import { Activity } from "~/features/activity";
import {
  Mission,
  isOnboardingMission as isOnboardingMissionFunc,
} from "~/features/missions";

import { ActivityListItem } from "./ActivityListItem";

export type MissionSectionProps = {
  mission: Mission;
  activities: Activity[];
  /* Allow overriding the default message if needed */
  activityListMessage?: string;
  hideDescription?: boolean;
  hideTotalMissionXpPoints?: boolean;
  displayGoToMissionButton?: boolean;
  hidePartnersOnActivities?: boolean;
} & Omit<React.ComponentPropsWithRef<"article">, "children">;

export const MissionSection: React.FC<MissionSectionProps> = (props) => {
  const {
    mission,
    activities,
    activityListMessage,
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

  const goToMissionButtonLabel = i18n.formatMessage({
    id: "MissionSection.goToMissionButtonLabel",
    description:
      "Label of the button on the Mission card to open the mission page",
    defaultMessage: "Go to Mission",
  });

  const resolvedActivityListMessage =
    activityListMessage ??
    i18n.formatMessage({
      id: "MissionSection.defaultActivityListMessage",
      description:
        "Default message displayed above the activity list in the mission card",
      defaultMessage: "Complete all activities below",
    });

  const resourcesSectionTitle = i18n.formatMessage({
    id: "MissionSection.resourcesSectionTitle",
    description: "Title of the resources section in each mission section",
    defaultMessage: "Resources",
  });

  return (
    <article {...divProps}>
      <div
        className={twMerge(
          "border border-border bg-clip-padding rounded-2xl",
          isOnboardingMission ? "bg-mission-onboarding" : "bg-mission-default"
        )}
      >
        <section className=" p-6 flex flex-row gap-6">
          <div className="flex flex-col items-start gap-6">
            <Typography variant="heading-m">
              {i18n.formatMessage(mission.title)}
            </Typography>
            {!hideDescription && (
              <Typography variant="base">
                {i18n.formatMessage(mission.description, {
                  newline: (
                    <>
                      <br />
                    </>
                  ),
                })}
              </Typography>
            )}
            {mission.resources.length > 0 ? (
              <aside className="flex flex-col gap-2 text-muted-foreground">
                <Typography variant="subtitle">
                  {resourcesSectionTitle}
                </Typography>
                <ul>
                  {mission.resources.map((resource) => (
                    <li key={resource.url}>
                      <ExternalLink href={resource.url} openInNewTab>
                        {i18n.formatMessage(resource.label)}
                      </ExternalLink>
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}
            {displayGoToMissionButton && (
              <ButtonLink
                href={`/missions/${mission.id}`}
                internal
                className="text-background bg-white hover:bg-white/90"
                // TODO: Create button colour variant
              >
                {goToMissionButtonLabel}
              </ButtonLink>
            )}
          </div>
          {!hideTotalMissionXpPoints && (
            <div className="hidden lg:block">
              <XpPointsBadge
                nbXpPoints={totalMissionXpPoints}
                theme={isOnboardingMission ? "onboarding" : "default"}
                className="w-50"
              />
            </div>
          )}
        </section>
        <section className="py-6 px-4 lg:py-8 lg:px-6 flex flex-col gap-6 rounded-[calc(1rem_-_1px)] bg-background/90">
          <Typography variant="base">{resolvedActivityListMessage}</Typography>
          <ul className="flex flex-col gap-6">
            {activities.map((activity, index) => (
              <li key={activity.id}>
                <Link to={`/activities/${activity.id}`}>
                  <ActivityListItem
                    activity={activity}
                    activityIndex={index + 1}
                    showPartners={!hidePartnersOnActivities}
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

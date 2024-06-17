import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { ButtonLink, ExternalLink, Typography } from "~/components/atoms";
import { XpPointsBadge } from "~/components/molecules";
import { Activity, MISSION_01_ID, Mission } from "~/features/activity";

import { ActivityListItem } from "./ActivityListItem";
import { ComingSoonActivityItem } from "./ComingSoonActivityItem";

export type MissionCardProps = {
  mission: Mission;
  activities: Activity[];

  /* Allow overriding the default message if needed */
  activityListMessage?: string;
  showDescription?: boolean;
  showPoints?: boolean;
  hideButtonLink?: boolean;
  showPartners?: boolean;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const MissionCard: React.FC<MissionCardProps> = (props) => {
  const {
    mission,
    activities,
    activityListMessage,
    showDescription,
    showPoints,
    hideButtonLink,
    showPartners,
    ...divProps
  } = props;

  const i18n = useIntl();
  const isOnboardingMission = mission.id === MISSION_01_ID;
  const { resources } = mission;

  const goToMissionButtonLabel = i18n.formatMessage({
    id: "MissionCard.goToMissionButtonLabel",
    description:
      "Label of the button on the Mission card to open the mission page",
    defaultMessage: "Go to Mission",
  });

  const resolvedActivityListMessage =
    activityListMessage ??
    i18n.formatMessage({
      id: "MissionCard.defaultActivityListMessage",
      description:
        "Default message displayed above the activity list in the mission card",
      defaultMessage: "Complete all activities below",
    });

  const resourcesSectionTitle = i18n.formatMessage({
    id: "MissionCard.resourcesSectionTitle",
    description: "Title of the resources section in each mission card",
    defaultMessage: "Resources",
  });
  const points = activities.reduce((acc, cur) => acc + cur.points, 0);

  return (
    <div {...divProps}>
      <div
        className={twMerge(
          "border border-border bg-clip-padding bg-mission-card rounded-2xl",
          isOnboardingMission ? "bg-onboarding-mission-card" : "bg-mission-card"
        )}
      >
        <div className="flex py-6 px-4 lg:px-6 gap-6">
          <div className="flex flex-col items-start gap-6">
            <Typography variant="heading-m">
              {i18n.formatMessage(mission.title)}
            </Typography>
            {showDescription && (
              <Typography variant={"base"}>
                {i18n.formatMessage(mission.shortDescription, {
                  newline: <></>,
                })}
              </Typography>
            )}
            {isOnboardingMission && resources && resources.length > 0 && (
              <aside className="text-muted-foreground">
                <Typography variant="subtitle">
                  {resourcesSectionTitle}
                </Typography>
                <ul>
                  {resources.map((resource, index) => (
                    <li key={index}>
                      <ExternalLink href={resource.url} openInNewTab>
                        {i18n.formatMessage(resource.label)}
                      </ExternalLink>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
            {!hideButtonLink && (
              <ButtonLink
                href={`/missions/${mission.id}`}
                className="text-background bg-white hover:bg-white/90"
                internal={true}
                // TODO: Create button colour variant
              >
                {goToMissionButtonLabel}
              </ButtonLink>
            )}
          </div>
          {showPoints && (
            <div className="hidden lg:block">
              <XpPointsBadge
                nbXpPoints={points}
                theme={isOnboardingMission ? "BLUE" : "RED"}
                size="BIG"
                className={"w-50 h-50"}
              />
            </div>
          )}
        </div>
        <div className="py-6 px-4 lg:pt-8 lg:p-6 flex flex-col gap-6 rounded-[calc(1rem_-_1px)] bg-background/90">
          <Typography variant="base">{resolvedActivityListMessage}</Typography>
          <ul className="flex flex-col w-full gap-6">
            {activities.map((activity, index) => (
              <li key={activity.id}>
                <Link to={`/activities/${activity.id}`}>
                  <ActivityListItem
                    activity={activity}
                    activityIndex={index + 1}
                    showPartners={showPartners}
                  />
                </Link>
              </li>
            ))}
            <li>
              <ComingSoonActivityItem activityIndex={activities.length + 1} />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

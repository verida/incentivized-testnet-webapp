import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { ButtonLink, Typography } from "~/components/atoms";
import { Activity, Mission } from "~/features/activity";

import { ComingSoonActivityItem } from "./ComingSoonActivityItem";
import { MissionActivityCard } from "./MissionActivityCard";

export type MissionCardProps = {
  mission: Mission;
  activities: Activity[];

  /* Allow overriding the default message if needed */
  activityListMessage?: string;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const MissionCard: React.FC<MissionCardProps> = (props) => {
  const { mission, activities, activityListMessage, ...divProps } = props;

  const i18n = useIntl();

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

  return (
    <div {...divProps}>
      <div className="border border-border bg-clip-padding bg-mission-card rounded-2xl">
        <div className="flex flex-col items-start py-6 px-4 lg:px-6 gap-6">
          <Typography variant="heading-m">
            {i18n.formatMessage(mission.title)}
          </Typography>
          <ButtonLink
            href={`/missions/${mission.id}`}
            className="text-background bg-white hover:bg-white/90"
            // TODO: Create button colour variant
          >
            {goToMissionButtonLabel}
          </ButtonLink>
        </div>
        <div className="py-6 px-4 lg:pt-8 lg:p-6 flex flex-col gap-6 rounded-[calc(1rem_-_1px)] bg-background/90">
          <Typography variant="base">{resolvedActivityListMessage}</Typography>
          <ul className="flex flex-col w-full gap-6">
            {activities.map((activity, index) => (
              <li key={activity.id}>
                <Link to={`/activities/${activity.id}`}>
                  <MissionActivityCard
                    activity={activity}
                    activityIndex={index + 1}
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

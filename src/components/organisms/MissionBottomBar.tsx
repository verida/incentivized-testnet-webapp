import React from "react";
import { useIntl } from "react-intl";

import { Typography } from "~/components/atoms";
import {
  MissionActivitiesProgressBar,
  XpPointsChip,
} from "~/components/molecules";
import { UserActivityStatus } from "~/features/activity";

export type MissionBottomBarProps = {
  isLoading?: boolean;
  activityStatuses: UserActivityStatus[];
  points?: number;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const MissionBottomBar: React.FC<MissionBottomBarProps> = (props) => {
  const { points, activityStatuses, isLoading, ...divProps } = props;

  const nbActivities = activityStatuses.length;
  const nbCompletedActivities = activityStatuses.filter(
    (status) => status === "completed"
  ).length;

  const i18n = useIntl();

  const shortMessage = i18n.formatMessage(
    {
      id: "MissionBottomBar.shortMessage",
      defaultMessage: `{nbCompletedActivities, number} of {nbActivities, number} {nbActivities, plural,
        one {activity}
        other {activities}
      }`,
      description: "Message for the mission progress bar",
    },
    {
      nbCompletedActivities,
      nbActivities,
    }
  );

  const longMessage = i18n.formatMessage(
    {
      id: "MissionBottomBar.longMessage",
      defaultMessage: `{nbCompletedActivities, number} of {nbActivities, number} {nbActivities, plural,
        one {activity}
        other {activities}
      } completed`,
      description: "Message for the mission progress bar",
    },
    {
      nbCompletedActivities,
      nbActivities,
    }
  );

  return (
    <div {...divProps}>
      <div className="p-4 lg:px-6 lg:py-4 rounded-xl lg:rounded-2xl backdrop-blur-xl border border-border bg-clip-border bg-gradient-to-r from-primary/25 to-primary/10">
        <div className="flex flex-col gap-3 sm:gap-5">
          <div className="flex flex-row justify-between lg:justify-start gap-6 items-center">
            <Typography variant="heading-s" component="p" className="sm:hidden">
              {shortMessage}
            </Typography>
            <Typography
              variant="heading-s"
              component="p"
              className="hidden sm:block"
            >
              {longMessage}
            </Typography>
            <XpPointsChip nbXpPoints={points || 0} />
          </div>
          <MissionActivitiesProgressBar
            isLoading={isLoading}
            activityStatuses={activityStatuses}
            className="gap-1 sm:gap-2"
          />
        </div>
      </div>
    </div>
  );
};

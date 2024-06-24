import React from "react";
import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { Typography } from "~/components/atoms";
import { MissionActivitiesProgressBar } from "~/components/molecules/MissionActivitiesProgressBar";
import { UserActivityStatus } from "~/features/activity";

export type MissionCardActivitiesProgressBarProps = {
  isLoading?: boolean;
  activityStatuses: UserActivityStatus[];
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const MissionCardActivitiesProgressBar: React.FC<
  MissionCardActivitiesProgressBarProps
> = (props) => {
  const { activityStatuses, isLoading, className, ...divProps } = props;

  const nbActivities = activityStatuses.length;
  const nbCompletedActivities = activityStatuses.filter(
    (status) => status === "completed"
  ).length;

  const i18n = useIntl();

  const progressMessage = i18n.formatMessage(
    {
      id: "MissionCardActivitiesProgressBar.progressMessage",
      defaultMessage: `{nbCompletedActivities, number}/{nbActivities, number}`,
      description: "Message for the mission progress bar",
    },
    {
      nbCompletedActivities,
      nbActivities,
    }
  );

  return (
    <div className={twMerge("flex flex-col gap-2", className)} {...divProps}>
      <Typography variant="base-s" component="span">
        {progressMessage}
      </Typography>
      <MissionActivitiesProgressBar
        isLoading={isLoading}
        activityStatuses={activityStatuses}
        className="gap-1"
      />
    </div>
  );
};

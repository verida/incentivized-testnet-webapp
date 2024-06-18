import React from "react";
import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import {
  LegacyMissionProgessBarIndicator,
  Typography,
} from "~/components/atoms";
import { UserActivityStatus } from "~/features/activity";

export type LegacyMissionProgressBarProps = {
  isLoading?: boolean;
  statuses: UserActivityStatus[];
} & React.ComponentPropsWithRef<"div">;

export const LegacyMissionProgressBar: React.FC<
  LegacyMissionProgressBarProps
> = (props) => {
  const { isLoading, statuses, ...divProps } = props;

  const nbActivities = statuses.length;
  const nbCompletedActivities = statuses.filter(
    (status) => status === "completed"
  ).length;

  const i18n = useIntl();

  if (nbActivities === 0) {
    return null;
  }

  const missionProgressMessage = i18n.formatMessage(
    {
      id: "LegacyMissionProgressBar.missionProgressMessage",
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

  const classes = twMerge(
    isLoading ? "animate-pulse" : "",
    "flex flex-row gap-2 w-full mt-3"
  );

  return (
    <div {...divProps}>
      <Typography variant="subtitle">{missionProgressMessage}</Typography>
      <div className={classes}>
        {statuses.map((status, index) => (
          <LegacyMissionProgessBarIndicator
            key={index}
            variant={status}
            className="flex-grow"
          />
        ))}
      </div>
    </div>
  );
};

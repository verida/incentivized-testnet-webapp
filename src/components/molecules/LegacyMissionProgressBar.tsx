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
  small?: boolean;
} & React.ComponentPropsWithRef<"div">;

/**
 * @deprecated
 */
export const LegacyMissionProgressBar: React.FC<
  LegacyMissionProgressBarProps
> = (props) => {
  const { isLoading, statuses, small, ...divProps } = props;

  const nbActivities = statuses.length;
  const nbCompletedActivities = statuses.filter(
    (status) => status === "completed"
  ).length;

  const i18n = useIntl();

  if (nbActivities === 0) {
    return null;
  }

  const separator = small ? "/" : " of ";

  const missionProgressMessage = i18n.formatMessage(
    {
      id: "LegacyMissionProgressBar.missionProgressMessage",
      defaultMessage: `{nbCompletedActivities, number}{separator}{nbActivities, number} {nbActivities, plural,
        one {activity}
        other {activities}
      } completed`,
      description: "Message for the mission progress bar",
    },
    {
      nbCompletedActivities,
      nbActivities,
      separator,
    }
  );

  const missionProgressShortenMessage = i18n.formatMessage(
    {
      id: "LegacyMissionProgressBar.missionProgressShortenMessage",
      defaultMessage: `{nbCompletedActivities, number}/{nbActivities, number}`,
      description: "Shorten Message for the mission progress bar",
    },
    {
      nbCompletedActivities,
      nbActivities,
    }
  );

  const classes = twMerge(
    isLoading ? "animate-pulse" : "",
    small ? "gap-1 items-center" : "gap-2",
    "flex flex-row w-full mt-3"
  );

  return (
    <div {...divProps}>
      <Typography
        variant="subtitle"
        className={small ? "hidden lg:block text-base-s font-semibold" : ""}
      >
        {missionProgressMessage}
      </Typography>
      <div className="flex gap-2 items-center">
        <div className={classes}>
          {statuses.map((status, index) => (
            <LegacyMissionProgessBarIndicator
              key={index}
              variant={status}
              className="flex-grow"
            />
          ))}
          {small ? (
            <Typography
              variant="heading-xs"
              className="lg:hidden text-base-s font-semibold ml-1"
            >
              {missionProgressShortenMessage}
            </Typography>
          ) : null}
        </div>
      </div>
    </div>
  );
};

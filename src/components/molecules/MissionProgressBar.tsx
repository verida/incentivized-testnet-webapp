import React from "react";
import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import {
  MissionProgessBarIndicator,
  Typography,
  Variants,
} from "~/components/atoms";
import { UserActivityStatus } from "~/features/activity";

import { PointCard } from "./PointCard";

export type MissionProgressBarProps = {
  isLoading?: boolean;
  statuses: UserActivityStatus[];
  variant?: Variants;
  showPoint?: boolean;
  showLabel?: boolean;
  point?: number;
} & React.ComponentPropsWithRef<"div">;

export const MissionProgressBar: React.FunctionComponent<
  MissionProgressBarProps
> = (props) => {
  const {
    isLoading,
    statuses,
    variant,
    showPoint,
    point,
    showLabel,
    ...divProps
  } = props;

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
      id: "MissionProgressBar.missionProgressMessage",
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
    "flex flex-row gap-2 w-full"
  );

  return (
    <div {...divProps}>
      {(showLabel || showPoint) && (
        <div className="flex justify-between lg:justify-start gap-6 items-center">
          {showLabel && (
            <Typography
              variant={variant || "subtitle"}
              className="flex-1 lg:flex-none"
            >
              {missionProgressMessage}
            </Typography>
          )}

          {showPoint && <PointCard points={point || 0} />}
        </div>
      )}

      <div className={classes}>
        {statuses.map((status, index) => (
          <MissionProgessBarIndicator
            key={index}
            variant={status}
            className="flex-grow"
          />
        ))}
      </div>
    </div>
  );
};

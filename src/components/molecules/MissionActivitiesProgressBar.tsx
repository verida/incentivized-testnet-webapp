import React from "react";
import { twMerge } from "tailwind-merge";

import { MissionActivitiesProgressBarIndicator } from "~/components/atoms";
import { UserActivityStatus } from "~/features/activity";

export type MissionActivitiesProgressBarProps = {
  isLoading?: boolean;
  activityStatuses: UserActivityStatus[];
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const MissionActivitiesProgressBar: React.FC<
  MissionActivitiesProgressBarProps
> = (props) => {
  const { isLoading, activityStatuses, className, ...divProps } = props;

  const nbActivities = activityStatuses.length;

  if (nbActivities === 0) {
    return null;
  }

  const classes = twMerge(
    "flex flex-row gap-1", // TODO: Use container queries for the gap
    isLoading ? "animate-pulse" : "",
    className
  );

  return (
    <div className={classes} {...divProps}>
      {activityStatuses.map((status, index) => (
        <MissionActivitiesProgressBarIndicator
          key={index}
          variant={status}
          className="flex-grow"
        />
      ))}
    </div>
  );
};

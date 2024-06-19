import React from "react";
import { twMerge } from "tailwind-merge";

import { Icon } from "~/components/atoms/Icon";
import { ActivityStatus } from "~/features/activity";

export type ActivityIndexProps = {
  index: string;
  status?: ActivityStatus;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const ActivityIndex: React.FunctionComponent<ActivityIndexProps> = (
  props: ActivityIndexProps
) => {
  const { index, status = "todo", className, ...divProps } = props;

  return (
    <div
      {...divProps}
      className={twMerge(
        "bg-transparent-15 aspect-square rounded-full flex justify-center items-center text-sm font-semibold p-2",
        status === "ended"
          ? "bg-transparent-5 text-transparent-80"
          : status === "pending"
            ? "bg-transparent-95 text-background"
            : status === "completed"
              ? "bg-success"
              : "bg-transparent-15",
        status === "checking" ? "animate-pulse" : "",
        className
      )}
    >
      {status === "completed" ? (
        <Icon type="check" size={20} />
      ) : (
        <span className="h-5 aspect-square text-center">{index}</span>
      )}
    </div>
  );
};

/* <div
  className={twMerge(
    "rounded-full w-8 h-8 lg:w-10 lg:h-10 flex justify-center items-center text-desktop-base-s font-semibold",
    activity.ended
      ? "bg-ended-background"
      : userActivity?.status === "completed"
        ? "bg-success"
        : userActivity?.status === "pending"
          ? "bg-white text-background"
          : "bg-white/20"
  )}
>
  {userActivity?.status === "completed" ? (
    <Icon type="check" size={20} />
  ) : (
    activityIndex
  )}
</div>; */

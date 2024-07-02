import React from "react";
import { twMerge } from "tailwind-merge";

import { Icon } from "~/components/atoms/Icon";
import { ActivityStatus } from "~/features/activity";

export type ActivityIndexProps = {
  index: string;
  status?: ActivityStatus;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const ActivityIndex: React.FunctionComponent<ActivityIndexProps> = (
  props
) => {
  const { index, status = "todo", className, ...divProps } = props;

  return (
    <div
      {...divProps}
      className={twMerge(
        "bg-transparent-15 aspect-square rounded-full h-8 flex justify-center items-center text-sm leading-4 font-semibold p-2",
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
        <Icon type="check" size={16} />
      ) : (
        <span className="text-center">{index}</span>
      )}
    </div>
  );
};

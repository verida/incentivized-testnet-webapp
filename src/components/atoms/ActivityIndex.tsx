import React from "react";
import { twMerge } from "tailwind-merge";

export type ActivityIndexProps = {
  index: string;
} & React.ComponentPropsWithRef<"div">;

export const ActivityIndex: React.FunctionComponent<ActivityIndexProps> = (
  props
) => {
  const { index, className, ...divProps } = props;

  return (
    <div
      {...divProps}
      className={twMerge(
        "bg-transparent-15 aspect-square h-8 rounded-full flex justify-center items-center",
        className
      )}
    >
      {index}
    </div>
  );
};

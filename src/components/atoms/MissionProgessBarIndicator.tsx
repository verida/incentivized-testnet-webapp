import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";

const missionProgessBarIndicatorVariants = cva("w-full rounded-full h-2", {
  variants: {
    variant: {
      todo: "bg-transparent-15",
      pending: "bg-pending",
      completed: "bg-success-WHITE",
    },
  },
  defaultVariants: {
    variant: "todo",
  },
});

export type MissionProgressBarIndicatorVariants = VariantProps<
  typeof missionProgessBarIndicatorVariants
>;

export type MissionProgessBarIndicatorProps =
  MissionProgressBarIndicatorVariants & React.ComponentPropsWithRef<"div">;

export const MissionProgessBarIndicator: React.FunctionComponent<
  MissionProgessBarIndicatorProps
> = (props) => {
  const { variant, className, ...divProps } = props;

  const classes = twMerge(
    missionProgessBarIndicatorVariants({ variant }),
    className
  );

  return <div className={classes} {...divProps}></div>;
};

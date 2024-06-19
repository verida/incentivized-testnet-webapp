import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";

const missionActivitiesProgressBarIndicatorVariants = cva(
  "w-full rounded-full h-2",
  {
    variants: {
      variant: {
        todo: "bg-transparent-30",
        pending: "bg-transparent-60",
        completed: "bg-transparent-90",
      },
    },
    defaultVariants: {
      variant: "todo",
    },
  }
);

export type MissionActivitiesProgressBarIndicatorVariants = VariantProps<
  typeof missionActivitiesProgressBarIndicatorVariants
>;

export type MissionActivitiesProgressBarIndicatorProps =
  MissionActivitiesProgressBarIndicatorVariants &
    Omit<React.ComponentPropsWithRef<"div">, "children">;

export const MissionActivitiesProgressBarIndicator: React.FC<
  MissionActivitiesProgressBarIndicatorProps
> = (props) => {
  const { variant, className, ...divProps } = props;

  const classes = twMerge(
    missionActivitiesProgressBarIndicatorVariants({ variant }),
    className
  );

  return <div className={classes} {...divProps}></div>;
};

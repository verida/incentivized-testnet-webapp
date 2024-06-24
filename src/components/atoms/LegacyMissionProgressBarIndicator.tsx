import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";

const legacyMissionProgessBarIndicatorVariants = cva(
  "w-full rounded-full h-2",
  {
    variants: {
      variant: {
        todo: "bg-transparent-15",
        pending: "bg-pending",
        completed: "bg-success",
      },
    },
    defaultVariants: {
      variant: "todo",
    },
  }
);

export type LegacyMissionProgressBarIndicatorVariants = VariantProps<
  typeof legacyMissionProgessBarIndicatorVariants
>;

export type LegacyMissionProgessBarIndicatorProps =
  LegacyMissionProgressBarIndicatorVariants &
    React.ComponentPropsWithRef<"div">;

export const LegacyMissionProgessBarIndicator: React.FunctionComponent<
  LegacyMissionProgessBarIndicatorProps
> = (props) => {
  const { variant, className, ...divProps } = props;

  const classes = twMerge(
    legacyMissionProgessBarIndicatorVariants({ variant }),
    className
  );

  return <div className={classes} {...divProps}></div>;
};

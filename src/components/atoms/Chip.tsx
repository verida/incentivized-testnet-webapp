import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";

const chipVariants = cva(
  "px-4 py-2 rounded-full border border-solid w-fit leading-4",
  {
    variants: {
      color: {
        default: "bg-foreground/20 text-foreground border-foreground",
        primary: "bg-primary-background text-primary border-primary",
        success: "bg-success-background text-success border-success",
        pending: "bg-pending-background text-pending border-pending",
      },
    },
    defaultVariants: {
      color: "default",
    },
  }
);

export type ChipVariants = VariantProps<typeof chipVariants>;

export type ChipProps = {
  children: React.ReactNode;
} & ChipVariants &
  React.ComponentPropsWithoutRef<"div">;

export const Chip: React.FunctionComponent<ChipProps> = (props) => {
  const { children, color, className, ...divProps } = props;

  const classes = twMerge(chipVariants({ color }), className);

  return (
    <div {...divProps} className={classes}>
      {children}
    </div>
  );
};

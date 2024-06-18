import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";

const chipVariants = cva(
  "px-3 py-1.5 rounded-full border border-solid w-fit text-sm font-semibold whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-foreground/20 text-foreground border-foreground/20",
        muted: "bg-transparent text-muted-foreground border-border",
        primary: "bg-primary-background text-primary border-primary/20",
        success: "bg-success-background text-success border-success/20",
        pending: "bg-pending-background text-pending border-pending/20",
        ended: "bg-ended-background text-ended border-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type ChipVariants = VariantProps<typeof chipVariants>;

export type ChipProps = {
  children: React.ReactNode;
} & ChipVariants &
  React.ComponentPropsWithRef<"div">;

export const Chip: React.FunctionComponent<ChipProps> = (props) => {
  const { children, variant, className, ...divProps } = props;

  const classes = twMerge(chipVariants({ variant }), className);

  return (
    <div {...divProps} className={classes}>
      {children}
    </div>
  );
};

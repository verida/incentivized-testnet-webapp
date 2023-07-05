import { type VariantProps, cva } from "class-variance-authority";
import React from "react";

const skeletonBaseVariants = cva("h-full w-full bg-primary", {
  variants: {
    rounded: {
      none: "rounded-none",
      full: "rounded-full",
      large: "rounded-lg",
      xlarge: "rounded-xl",
    },
  },
  defaultVariants: {
    rounded: "full",
  },
});

export type SkeletonBaseVariants = VariantProps<typeof skeletonBaseVariants>;

export type SkeletonBaseProps = SkeletonBaseVariants &
  React.ComponentPropsWithRef<"div">;

export const SkeletonBase: React.FunctionComponent<SkeletonBaseProps> = (
  props
) => {
  const { rounded, ...divProps } = props;

  const classes = skeletonBaseVariants({ rounded });

  return (
    <div {...divProps}>
      <div className={classes}></div>
    </div>
  );
};

import React from "react";
import { twMerge } from "tailwind-merge";

export const BlurredDivBase: React.FC<React.ComponentPropsWithRef<"div">> = (
  props
) => {
  const { className, children, ...divProps } = props;

  return (
    <div
      className={twMerge(
        "p-4 lg:px-6 lg:py-4 rounded-xl lg:rounded-2xl backdrop-blur-xl border border-border bg-clip-border bg-gradient-to-r from-primary/25 to-primary/10",
        className
      )}
      {...divProps}
    >
      {children}
    </div>
  );
};

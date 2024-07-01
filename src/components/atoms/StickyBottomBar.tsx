import React from "react";
import { twMerge } from "tailwind-merge";

export const StickyBottomBar: React.FC<React.ComponentPropsWithRef<"div">> = (
  props
) => {
  const { className, children, ...divProps } = props;

  return (
    <div
      className={twMerge(
        "sticky bottom-4 sm:bottom-6 max-w-[calc(1264px_-_12rem)] w-full",
        className
      )}
      {...divProps}
    >
      {children}
    </div>
  );
};

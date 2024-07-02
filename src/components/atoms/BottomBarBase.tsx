import React from "react";
import { twMerge } from "tailwind-merge";

export type BottomBarBaseProps = React.ComponentPropsWithRef<"div">;

export const BottomBarBase: React.FC<BottomBarBaseProps> = (props) => {
  const { className, children, ...divProps } = props;

  return (
    <div
      className={twMerge(
        "rounded-xl lg:rounded-2xl backdrop-blur-xl border border-border bg-clip-border bg-gradient-to-r from-primary/25 to-primary/10",
        className
      )}
      {...divProps}
    >
      {children}
    </div>
  );
};

import React from "react";
import { twMerge } from "tailwind-merge";

export type InputProps = React.ComponentPropsWithRef<"input">;

export const Input: React.FunctionComponent<InputProps> = (props) => {
  const { className, ...otherProps } = props;

  const classes = twMerge(
    "w-full rounded-xl border border-solid border-transparent bg-primary/10 text-base sm:text-desktop-base py-[calc(0.625rem_-_1px)] px-[calc(0.625rem_-_1px)] hover:border-primary/15 focus:border-primary/15 focus:bg-[inherit] focus:outline-none",
    className
  );

  return <input className={classes} {...otherProps} />;
};

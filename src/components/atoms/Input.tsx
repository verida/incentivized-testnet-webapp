import React from "react";
import { twMerge } from "tailwind-merge";

export type InputProps = React.ComponentPropsWithRef<"input">;

export const Input: React.FunctionComponent<InputProps> = (props) => {
  const { className, ...otherProps } = props;

  const classes = twMerge(
    "w-full rounded-xl border border-solid border-transparent bg-primary/10 text-base leading-5 py-[calc(0.625rem_-_1px)] pl-3 pr-10 hover:border-primary/15 focus:border-primary/15 focus:bg-[inherit] focus:outline-none",
    className
  );

  return <input className={classes} {...otherProps} />;
};

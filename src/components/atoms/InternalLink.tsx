import React from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

export type InternalLinkProps = React.ComponentPropsWithRef<typeof Link>;

export const InternalLink: React.FunctionComponent<InternalLinkProps> = (
  props
) => {
  const { className, ...otherProps } = props;

  return (
    <Link
      {...otherProps}
      className={twMerge("underline hover:text-foreground", className)}
    />
  );
};

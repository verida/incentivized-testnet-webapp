import { Close, LoadingOne, User } from "@icon-park/react";
import React from "react";

import { ReactComponent as VeridaTick } from "~/assets/icons/verida_tick.svg";

export type GenericIconType = "user" | "close" | "loading" | "verida-tick";
export type IconType = GenericIconType;

type IconProps = {
  type: IconType;
  size?: number | string;
} & Omit<React.ComponentPropsWithoutRef<typeof IconContainer>, "children">;

export const Icon: React.FunctionComponent<IconProps> = (props) => {
  const { type, size = 20, ...otherProps } = props;

  switch (type) {
    case "user":
      return <User size={size} {...otherProps} />;
    case "close":
      return <Close size={size} {...otherProps} />;
    case "loading":
      return <LoadingOne size={size} {...otherProps} />;
    case "verida-tick":
      return (
        <IconContainer {...otherProps}>
          <VeridaTick height={size} width={size} />
        </IconContainer>
      );
    default:
      throw new Error("A supported type must be defined for the icon");
  }
};

const IconContainer: React.FunctionComponent<
  React.ComponentPropsWithoutRef<"span">
> = (props) => {
  const { children, ...otherProps } = props;
  return <span {...otherProps}>{children}</span>;
};

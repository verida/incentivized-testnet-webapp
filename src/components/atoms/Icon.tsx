import { Close, User } from "@icon-park/react";
import React from "react";

export type GenericIconType = "user" | "close";
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

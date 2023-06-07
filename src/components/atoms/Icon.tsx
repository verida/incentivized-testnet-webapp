import {
  Close,
  LoadingOne,
  Telegram,
  Twitter,
  User,
  Youtube,
} from "@icon-park/react";
import React from "react";

import { ReactComponent as VeridaTick } from "~/assets/icons/verida_tick.svg";
import { ReactComponent as Discord } from "~/assets/logos/platforms/discord.svg";
import { ReactComponent as LinkedIn } from "~/assets/logos/platforms/linkedin.svg";

export type GenericIconType = "user" | "close" | "loading" | "verida-tick";
export type PlatformIconType =
  | "platform-discord"
  | "platform-linkedin"
  | "platform-medium"
  | "platform-reddit"
  | "platform-telegram"
  | "platform-twitter"
  | "platform-youtube";
export type IconType = GenericIconType | PlatformIconType;

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
    case "platform-discord":
      return (
        <IconContainer {...otherProps}>
          <Discord height={size} width={size} />
        </IconContainer>
      );
    case "platform-linkedin":
      return (
        <IconContainer {...otherProps}>
          <LinkedIn height={size} width={size} />
        </IconContainer>
      );
    case "platform-reddit":
      return (
        <IconContainer {...otherProps}>
          {/* TODO: Put a custom made Reddit logo */}
          <LinkedIn height={size} width={size} />
        </IconContainer>
      );
    case "platform-medium":
      return (
        <IconContainer {...otherProps}>
          {/* TODO: Put a custom made Medium logo */}
          <LinkedIn height={size} width={size} />
        </IconContainer>
      );
    case "platform-twitter":
      return <Twitter size={size} {...otherProps} />;
    case "platform-telegram":
      return <Telegram size={size} {...otherProps} />;
    case "platform-youtube":
      return <Youtube size={size} {...otherProps} />;

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

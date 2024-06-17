import {
  Agreement,
  ArrowLeft,
  ArrowRight,
  Attention,
  Bug,
  Check,
  CheckOne,
  Close,
  Copy,
  Down,
  History,
  Left,
  LoadingOne,
  Logout,
  Right,
  Share,
  ShareOne,
  Up,
  User,
  Wallet,
} from "@icon-park/react";
import { ReactComponent as XpPointsIcon } from "assets/icons/xp_points_icon.svg";
import { ReactComponent as Whatsapp } from "assets/logos/platforms/whatsapp.svg";
import React from "react";

import { ReactComponent as Discord } from "~/assets/logos/platforms/discord.svg";
import { ReactComponent as LinkedIn } from "~/assets/logos/platforms/linkedin.svg";
import { ReactComponent as Medium } from "~/assets/logos/platforms/medium.svg";
import { ReactComponent as Reddit } from "~/assets/logos/platforms/reddit.svg";
import { ReactComponent as Telegram } from "~/assets/logos/platforms/telegram.svg";
import { ReactComponent as Twitter } from "~/assets/logos/platforms/twitter.svg";
import { ReactComponent as X } from "~/assets/logos/platforms/x.svg";
import { ReactComponent as Youtube } from "~/assets/logos/platforms/youtube.svg";

export type GenericIconType =
  | "chevron-up"
  | "chevron-down"
  | "chevron-right"
  | "chevron-left"
  | "user"
  | "bug"
  | "clock"
  | "close"
  | "copy"
  | "loading"
  | "check"
  | "disconnect"
  | "share"
  | "wallet"
  | "notification-success"
  | "notification-error"
  | "agreement"
  | "external-link"
  | "arrow-right"
  | "arrow-left";
export type CustomIconType = "xp-points";
export type PlatformIconType =
  | "platform-discord"
  | "platform-linkedin"
  | "platform-medium"
  | "platform-reddit"
  | "platform-telegram"
  | "platform-twitter"
  | "platform-x"
  | "platform-whatsapp"
  | "platform-youtube";
export type IconType = GenericIconType | CustomIconType | PlatformIconType;

export type IconProps = {
  type: IconType;
  size?: number | string;
} & Omit<React.ComponentPropsWithRef<typeof IconContainer>, "children">;

export const Icon: React.FunctionComponent<IconProps> = (props) => {
  const { type, size = 20, ...otherProps } = props;

  switch (type) {
    case "chevron-down":
      return <Down size={size} {...otherProps} />;
    case "chevron-up":
      return <Up size={size} {...otherProps} />;
    case "chevron-right":
      return <Right size={size} {...otherProps} />;
    case "chevron-left":
      return <Left size={size} {...otherProps} />;
    case "user":
      return <User size={size} {...otherProps} />;
    case "bug":
      return <Bug size={size} {...otherProps} />;
    case "clock":
      return <History size={size} {...otherProps} />;
    case "close":
      return <Close size={size} {...otherProps} />;
    case "loading":
      return <LoadingOne size={size} {...otherProps} />;
    case "check":
      return <Check size={size} {...otherProps} />;
    case "copy":
      return <Copy size={size} {...otherProps} />;
    case "disconnect":
      return <Logout size={size} {...otherProps} />;
    case "share":
      return <ShareOne size={size} {...otherProps} />;
    case "notification-success":
      return <CheckOne size={size} {...otherProps} />;
    case "notification-error":
      return <Attention size={size} {...otherProps} />;
    case "agreement":
      return <Agreement size={size} {...otherProps} />;
    case "wallet":
      return <Wallet size={size} {...otherProps} />;
    case "external-link":
      return <Share size={size} {...otherProps} />;
    case "arrow-right":
      return <ArrowRight size={size} {...otherProps} />;
    case "arrow-left":
      return <ArrowLeft size={size} {...otherProps} />;
    case "xp-points":
      return (
        <IconContainer {...otherProps}>
          <XpPointsIcon height={size} width={size} />
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
    case "platform-medium":
      return (
        <IconContainer {...otherProps}>
          <Medium height={size} width={size} />
        </IconContainer>
      );
    case "platform-reddit":
      return (
        <IconContainer {...otherProps}>
          <Reddit height={size} width={size} />
        </IconContainer>
      );
    case "platform-telegram":
      return (
        <IconContainer {...otherProps}>
          <Telegram height={size} width={size} />
        </IconContainer>
      );
    case "platform-twitter":
      return (
        <IconContainer {...otherProps}>
          <Twitter height={size} width={size} />
        </IconContainer>
      );
    case "platform-x":
      return (
        <IconContainer {...otherProps}>
          <X height={size} width={size} />
        </IconContainer>
      );
    case "platform-whatsapp":
      return (
        <IconContainer {...otherProps}>
          <Whatsapp height={size} width={size} />
        </IconContainer>
      );
    case "platform-youtube":
      return (
        <IconContainer {...otherProps}>
          <Youtube height={size} width={size} />
        </IconContainer>
      );

    default:
      throw new Error("A supported type must be defined for the icon");
  }
};

const IconContainer: React.FunctionComponent<
  React.ComponentPropsWithRef<"span">
> = (props) => {
  const { children, ...otherProps } = props;
  return <span {...otherProps}>{children}</span>;
};

import React from "react";
import { twJoin } from "tailwind-merge";

import { Icon } from "./Icon";

export type AvatarProps = {
  image?: string;
  alt?: string;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const Avatar: React.FunctionComponent<AvatarProps> = (props) => {
  const { image, alt = "avatar", ...otherProps } = props;

  const commonClasses =
    "aspect-square h-full rounded-full border border-border-60 bg-transparent-15";

  const avatar = image ? (
    <img
      src={image}
      alt={alt}
      className={twJoin(commonClasses, "border-1 object-cover")}
    />
  ) : (
    <Icon
      type="user"
      size="70%"
      className={twJoin(
        commonClasses,
        "flex items-center justify-center border-2"
      )}
    />
  );

  return <div {...otherProps}>{avatar}</div>;
};

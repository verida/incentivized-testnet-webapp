import React from "react";

import { ButtonBase } from "./ButtonBase";

export type IconButtonProps = {
  icon: React.ReactNode;
} & Omit<React.ComponentPropsWithRef<typeof ButtonBase>, "children" | "shape">;

export const IconButton: React.FC<IconButtonProps> = (props) => {
  const { icon, ...otherProps } = props;

  return (
    <ButtonBase {...otherProps} shape={"square"}>
      {icon}
    </ButtonBase>
  );
};

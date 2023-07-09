import React from "react";

import { ButtonBase } from "./ButtonBase";

export type ButtonProps = Omit<
  React.ComponentPropsWithRef<typeof ButtonBase>,
  "shape"
>;

export const Button: React.FC<ButtonProps> = (props) => {
  return <ButtonBase {...props} shape={"standard"} />;
};

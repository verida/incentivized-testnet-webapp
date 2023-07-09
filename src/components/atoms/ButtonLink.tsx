import React from "react";

import { ButtonLinkBase } from "./ButtonLinkBase";

export type ButtonLinkProps = Omit<
  React.ComponentPropsWithRef<typeof ButtonLinkBase>,
  "shape"
>;

export const ButtonLink: React.FC<ButtonLinkProps> = (props) => {
  return <ButtonLinkBase shape="standard" {...props} />;
};

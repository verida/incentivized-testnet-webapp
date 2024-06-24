import React from "react";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import {
  ButtonBaseVariants,
  buttonBaseVariants,
} from "~/components/atoms/ButtonBase";

export type ButtonLinkBaseProps = {
  href: string;
  openInNewTab?: boolean;
  internal?: boolean;
} & ButtonBaseVariants &
  Omit<React.ComponentPropsWithRef<"a">, "href">;

export const ButtonLinkBase: React.FunctionComponent<ButtonLinkBaseProps> = (
  props
) => {
  const {
    variant,
    color,
    size,
    shape,
    href,
    openInNewTab = false,
    children,
    className,
    target,
    rel,
    internal = false,
    ...otherProps
  } = props;

  const classes = twMerge(
    buttonBaseVariants({ variant, color, size, shape }),
    className
  );

  return internal ? (
    <Link {...otherProps} to={href} className={classes}>
      {children}
    </Link>
  ) : (
    <a
      {...otherProps}
      href={href}
      target={target ? target : openInNewTab ? "_blank" : undefined}
      rel={rel ? rel : openInNewTab ? "noopener noreferrer" : undefined}
      className={classes}
    >
      {children}
    </a>
  );
};

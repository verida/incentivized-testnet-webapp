import React from "react";
import { twMerge } from "tailwind-merge";

export type ExternalLinkProps = {
  href: string;
  openInNewTab?: boolean;
} & Omit<React.ComponentPropsWithRef<"a">, "href">;

export const ExternalLink: React.FunctionComponent<ExternalLinkProps> = (
  props
) => {
  const {
    href,
    openInNewTab = false,
    children,
    className,
    target,
    rel,
    ...otherProps
  } = props;

  return (
    <a
      {...otherProps}
      href={href}
      target={target ? target : openInNewTab ? "_blank" : undefined}
      rel={rel ? rel : openInNewTab ? "noopener noreferrer" : undefined}
      className={twMerge("underline hover:text-foreground", className)}
    >
      {children}
    </a>
  );
};

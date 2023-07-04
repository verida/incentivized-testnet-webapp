import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";

const buttonLinkBaseVariants = cva(
  "flex items-center gap-2 justify-center text-sm leading-4 font-semibold",
  {
    variants: {
      variant: {
        text: "bg-transparent disabled:bg-transparent",
        contained: "",
      },
      color: {
        default: "",
        primary: "",
      },
      size: {
        "no-margin": "p-0 rounded-lg",
        "small": "p-2 rounded-lg",
        "medium": "p-3 rounded-xl",
        "large": "p-4 rounded-xl w-full",
        "xlarge": "p-5 rounded-xl w-full",
      },
      shape: {
        standard: "",
        square: "",
        circle: "rounded-full",
      },
    },
    compoundVariants: [
      {
        size: "small",
        shape: "standard",
        className: "px-4",
      },
      {
        size: "medium",
        shape: "standard",
        className: "px-8",
      },
      {
        size: "large",
        shape: "standard",
        className: "px-8",
      },
      {
        size: "xlarge",
        shape: "standard",
        className: "px-10",
      },
      {
        variant: "contained",
        color: "default",
        className:
          "bg-transparent-10 hover:bg-transparent-20 disabled:bg-transparent-5 disabled:text-muted-foreground",
      },
      {
        variant: "text",
        color: "default",
        className: "hover:bg-transparent-10 disabled:text-muted-foreground",
      },
      {
        variant: "contained",
        color: "primary",
        className:
          "text-primary-foreground bg-primary hover:bg-primary/80 disabled:bg-primary/20",
      },
      {
        variant: "text",
        color: "primary",
        className: "text-primary hover:bg-primary/10 disabled:text-primary/70",
      },
    ],
    defaultVariants: {
      variant: "contained",
      color: "default",
      size: "medium",
      shape: "standard",
    },
  }
);

export type ButtonLinkBaseVariants = VariantProps<
  typeof buttonLinkBaseVariants
>;

export type ButtonLinkBaseProps = {
  href: string;
  openInNewTab?: boolean;
} & ButtonLinkBaseVariants &
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
    ...otherProps
  } = props;

  const classes = twMerge(
    buttonLinkBaseVariants({ variant, color, size, shape }),
    className
  );

  return (
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

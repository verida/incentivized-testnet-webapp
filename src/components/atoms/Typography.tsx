import React from "react";
import { twMerge } from "tailwind-merge";

// TODO: Use cva for variants definition
type TypographyVariant =
  | "heading-l"
  | "heading-m"
  | "heading-s"
  | "base"
  | "subtitle";

type TypographyComponent =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p"
  | "span";

type TypographyProps = {
  variant?: TypographyVariant;
  component?: TypographyComponent;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<"div">, "children">;

const mapping = {
  "heading-l": "h1",
  "heading-m": "h2",
  "heading-s": "h3",
  "base": "p",
  "subtitle": "span",
};

// TODO: Properly define the styles for each variant
const variantClasses = {
  "heading-l": "text-heading-l",
  "heading-m": "text-heading-m",
  "heading-s": "text-heading-s",
  "base": "text-base",
  "subtitle": "text-subtitle",
};

// TODO: Replace all p and h tags by Typography component

export const Typography: React.FunctionComponent<TypographyProps> = (props) => {
  const {
    variant = "base",
    component,
    children,
    className,
    ...otherProps
  } = props;

  const htmlTag = component || mapping[variant];

  const classes = twMerge(variantClasses[variant], className);

  switch (htmlTag) {
    case "h1":
      return (
        <h1 className={classes} {...otherProps}>
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2 className={classes} {...otherProps}>
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3 className={classes} {...otherProps}>
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 className={classes} {...otherProps}>
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5 className={classes} {...otherProps}>
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6 className={classes} {...otherProps}>
          {children}
        </h6>
      );
    case "span":
      return (
        <span className={classes} {...otherProps}>
          {children}
        </span>
      );
    case "p":
    default:
      return (
        <p className={classes} {...otherProps}>
          {children}
        </p>
      );
  }
};

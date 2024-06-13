import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";

export type Variants =
  | "base"
  | "heading-l"
  | "heading-m"
  | "heading-s"
  | "base-s"
  | "subtitle"
  | "base-l";

const typographyVariants = cva("", {
  variants: {
    variant: {
      "heading-l": "text-heading-l sm:text-desktop-heading-l",
      "heading-m": "text-heading-m sm:text-desktop-heading-m",
      "heading-s": "text-heading-s sm:text-desktop-heading-s",
      "base": "text-base sm:text-desktop-base",
      "base-s": "text-base-s sm:text-desktop-base-s",
      "subtitle": "text-subtitle",
      "base-l": "lg:text-desktop-base-l text-heading-s",
    },
    component: {
      h1: "",
      h2: "",
      h3: "",
      h4: "",
      h5: "",
      h6: "",
      p: "",
      span: "",
    },
  },
  defaultVariants: {
    variant: "base",
    component: "p",
  },
});

export type TypographyVariants = VariantProps<typeof typographyVariants>;

export type TypographyProps = {
  children: React.ReactNode;
} & TypographyVariants &
  Omit<React.ComponentPropsWithRef<"div">, "children">;

const mapping = {
  "heading-l": "h1",
  "heading-m": "h2",
  "heading-s": "h3",
  "base": "p",
  "base-s": "p",
  "subtitle": "p",
  "base-l": "p",
};

export const Typography: React.FunctionComponent<TypographyProps> = (props) => {
  const { variant, component, children, className, ...otherProps } = props;

  const htmlTag = component || mapping[variant || "base"];

  const classes = twMerge(typographyVariants({ variant }), className);

  // TODO: Optimise without the switch
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

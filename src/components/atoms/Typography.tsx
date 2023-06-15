import React from "react";

type TypographyVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body";

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
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  body: "p",
};

// TODO: Properly define the styles for each variant
const variantClasses = {
  h1: "text-4xl font-bold mt-8 mb-2",
  h2: "text-3xl font-bold mt-8 mb-4",
  h3: "text-2xl font-bold mt-8 mb-2",
  h4: "text-xl font-bold mt-4 mb-2",
  h5: "text-lg font-bold mt-4 mb-2",
  h6: "text-base font-bold mt-4 mb-2",
  body: "text-sm font-normal",
};

// TODO: Replace all p and h tags by Typography component

export const Typography: React.FunctionComponent<TypographyProps> = (props) => {
  const {
    variant = "body",
    component,
    children,
    className = "",
    ...otherProps
  } = props;

  const htmlTag = component || mapping[variant];
  // TODO: Use twMerge
  const classes = `${variantClasses[variant]} ${className}`;

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

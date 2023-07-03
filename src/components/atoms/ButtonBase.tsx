import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";

const buttonBaseVariants = cva(
  "flex items-center justify-center space-x-2.5 text-sm font-medium",
  {
    variants: {
      variant: {
        text: "bg-transparent disabled:bg-transparent",
        contained: "disabled:text-muted-foreground",
      },
      color: {
        default: "",
        primary: "",
      },
      size: {
        "no-margin": "p-0 rounded-lg",
        "small": "p-1.5 rounded-lg",
        "medium": "p-2.5 rounded-xl",
        "large": "p-3.5 rounded-xl w-full",
        "xlarge": "p-4.5 rounded-xl w-full",
      },
      shape: {
        standard: "",
        square: "",
      },
    },
    compoundVariants: [
      {
        size: "small",
        shape: "standard",
        className: "px-2",
      },
      {
        size: "medium",
        shape: "standard",
        className: "px-4",
      },
      {
        size: "large",
        shape: "standard",
        className: "px-4",
      },
      {
        size: "xlarge",
        shape: "standard",
        className: "px-5",
      },
      {
        variant: "contained",
        color: "default",
        className:
          "bg-transparent-10 hover:bg-transparent-20 disabled:bg-transparent-5 ",
      },
      {
        variant: "text",
        color: "default",
        className: "hover:bg-transparent-10 disabled:text-muted-foreground",
      },
      {
        variant: "contained",
        color: "primary",
        className: "bg-primary hover:bg-primary/80 disabled:bg-primary/20",
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

export type ButtonBaseVariants = VariantProps<typeof buttonBaseVariants>;

export type ButtonBaseProps = ButtonBaseVariants &
  Omit<React.ComponentPropsWithRef<"button">, "type">;

export const ButtonBase: React.FunctionComponent<ButtonBaseProps> = (props) => {
  const { variant, color, size, shape, children, className, ...buttonProps } =
    props;

  const classes = twMerge(
    buttonBaseVariants({ variant, size, shape, color }),
    className
  );

  return (
    <button {...buttonProps} type="button" className={classes}>
      {children}
    </button>
  );
};

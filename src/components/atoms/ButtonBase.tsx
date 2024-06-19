import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";

const buttonBaseVariants = cva(
  "flex items-center gap-2 justify-center text-sm font-semibold whitespace-nowrap",
  {
    variants: {
      variant: {
        text: "bg-transparent disabled:bg-transparent",
        contained: "",
        outlined: "",
      },
      color: {
        default: "",
        primary: "",
      },
      size: {
        "no-margin": "p-0 rounded-lg",
        "small": "p-2 rounded-lg",
        "medium": "p-2.5 rounded-xl",
        "large": "p-4 rounded-xl w-full",
        "xlarge": "p-5 rounded-xl w-full",
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
          "text-foreground bg-transparent-15 hover:bg-transparent-30 disabled:opacity-30 disabled:bg-transparent-15",
      },
      {
        variant: "outlined",
        color: "default",
        className:
          "text-foreground bg-transparent-8 hover:bg-transparent-12 border border-border hover:border-border-hover disabled:opacity-30 disabled:bg-transparent-8",
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
          "text-primary-foreground bg-primary hover:bg-primary-background-hover disabled:bg-primary-background-disabled",
      },
      {
        variant: "outlined",
        color: "primary",
        // TODO: Properly rework the style of this coumpound variant when needed
        className:
          "text-primary bg-transparent-8 hover:bg-transparent-12 border-primary hover:border-primary disabled:opacity-30 disabled:bg-transparent-8",
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
    buttonBaseVariants({ variant, color, size, shape }),
    className
  );

  return (
    <button {...buttonProps} type="button" className={classes}>
      {children}
    </button>
  );
};

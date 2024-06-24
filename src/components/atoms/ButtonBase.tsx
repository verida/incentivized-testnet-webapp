import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";

export const buttonBaseVariants = cva(
  "flex items-center gap-2 justify-center text-sm font-semibold whitespace-nowrap w-fit",
  {
    variants: {
      variant: {
        text: "bg-transparent disabled:bg-transparent",
        contained: "",
        outlined: "",
      },
      color: {
        primary: "",
        secondary: "",
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
        color: "secondary",
        className:
          "text-foreground bg-transparent-15 hover:bg-transparent-30 disabled:opacity-30 disabled:bg-transparent-15",
      },
      {
        variant: "outlined",
        color: "secondary",
        className:
          "text-foreground bg-transparent-8 hover:bg-transparent-12 border border-border hover:border-border-hover disabled:opacity-30 disabled:bg-transparent-8",
      },
      {
        variant: "text",
        color: "secondary",
        className:
          "text-foreground bg-transparent hover:bg-transparent-10 disabled:text-muted-foreground",
      },
      {
        variant: "contained",
        color: "primary",
        className:
          "text-background bg-foreground hover:bg-foreground/90 disabled:bg-foreground/40",
      },
      {
        variant: "outlined",
        color: "primary",
        className:
          "text-foreground bg-transparent-8 hover:bg-transparent-12 border border-foreground hover:border-foreground/90 disabled:opacity-30 disabled:bg-transparent-8",
      },
      {
        variant: "text",
        color: "primary",
        className:
          "text-foreground bg-transparent hover:bg-foreground/10 disabled:opacity-30 disabled:bg-transparent",
      },
    ],
    defaultVariants: {
      variant: "contained",
      color: "secondary",
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

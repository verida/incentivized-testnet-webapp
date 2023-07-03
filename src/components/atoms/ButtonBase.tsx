import { type VariantProps, cva } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";

const buttonBaseVariants = cva(
  "flex items-center justify-center space-x-2.5 font-medium disabled:opacity-20",
  {
    variants: {
      variant: {
        text: "hover:bg-button",
        contained: "bg-button hover:bg-button-hover",
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
    ],
    defaultVariants: {
      variant: "contained",
      size: "medium",
      shape: "standard",
    },
  }
);

export type ButtonBaseVariants = VariantProps<typeof buttonBaseVariants>;

export type ButtonBaseProps = ButtonBaseVariants &
  Omit<React.ComponentPropsWithRef<"button">, "type">;

export const ButtonBase: React.FunctionComponent<ButtonBaseProps> = (props) => {
  const { variant, size, shape, children, className, ...buttonProps } = props;

  const classes = twMerge(
    buttonBaseVariants({ variant, size, shape }),
    className
  );

  return (
    <button {...buttonProps} type="button" className={classes}>
      {children}
    </button>
  );
};

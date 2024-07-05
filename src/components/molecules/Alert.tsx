import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";

import {
  Button,
  ButtonLink,
  ButtonLinkProps,
  ButtonProps,
  Typography,
} from "~/components/atoms";

const alertVariants = cva("rounded-2xl border border-solid", {
  variants: {
    type: {
      error: "bg-error-background text-error border-error/20",
      warning: "bg-warning-background text-warning border-warning/20",
      info: "bg-primary-background text-foreground border-primary/20",
      success: "bg-success-background text-success border-success/20",
    },
  },
  defaultVariants: {
    type: "info",
  },
});

export type AlertVariants = VariantProps<typeof alertVariants>;

type AlertAction = { label: string } & (
  | ({
      type: "button";
    } & ButtonProps)
  | ({
      type: "link";
    } & ButtonLinkProps)
);

export type AlertProps = AlertVariants & {
  message: string;
  actions?: AlertAction[];
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const Alert: React.FunctionComponent<AlertProps> = (props) => {
  const { type, message, actions, ...divProps } = props;

  const classes = alertVariants({ type });

  return (
    <div {...divProps}>
      <div className={classes}>
        <div className="p-4 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
          <Typography>{message}</Typography>
          {actions && actions.length > 0 ? (
            <div className="flex flex-row gap-4">
              {actions.slice(0, 2).map((action) => {
                if (action.type === "button") {
                  const { type: actionType, ...buttonProps } = action;
                  return (
                    <Button
                      key={action.label}
                      {...buttonProps}
                      variant={action.variant || "contained"}
                      color={
                        action.color
                          ? action.color
                          : type === "info"
                            ? "primary"
                            : "secondary"
                      }
                      className={twMerge("w-full", action.className)}
                    >
                      {action.label}
                    </Button>
                  );
                } else if (action.type === "link") {
                  const { type: actionType, ...linkProps } = action;
                  return (
                    <ButtonLink
                      key={action.label}
                      {...linkProps}
                      variant={action.variant || "contained"}
                      color={
                        action.color
                          ? action.color
                          : type === "info"
                            ? "primary"
                            : "secondary"
                      }
                      className={twMerge("w-full", action.className)}
                    >
                      {action.label}
                    </ButtonLink>
                  );
                }
                return null;
              })}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

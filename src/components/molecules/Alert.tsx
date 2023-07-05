import React from "react";

import { Button, Typography } from "~/components/atoms";

export type AlertType = "error" | "warning" | "info" | "success";

export type AlertProps = {
  type?: AlertType;
  message: string;
  actionLabel?: string;
  action?: () => void;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const Alert: React.FunctionComponent<AlertProps> = (props) => {
  const { message, actionLabel, action, ...divProps } = props;

  return (
    <div {...divProps}>
      <div className="flex flex-row justify-between items-center bg-primary-15 rounded-2xl p-4 gap-4">
        <Typography>{message}</Typography>
        <Button onClick={action} className="whitespace-nowrap">
          {actionLabel}
        </Button>
      </div>
    </div>
  );
};

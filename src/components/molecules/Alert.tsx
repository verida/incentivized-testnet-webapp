import React from "react";

import { Button } from "~/components/atoms";

type AlertType = "error" | "warning" | "info" | "success";

type AlertProps = {
  type?: AlertType;
  message: string;
  actionLabel?: string;
  action?: () => void;
} & Omit<React.ComponentPropsWithoutRef<"div">, "children">;

export const Alert: React.FunctionComponent<AlertProps> = (props) => {
  const { message, actionLabel, action, ...divProps } = props;

  return (
    <div {...divProps}>
      <div className="flex flex-row justify-between items-center bg-primary-15 rounded-2xl p-4 gap-4">
        <p>{message}</p>
        <Button onClick={action} className="whitespace-nowrap">
          {actionLabel}
        </Button>
      </div>
    </div>
  );
};

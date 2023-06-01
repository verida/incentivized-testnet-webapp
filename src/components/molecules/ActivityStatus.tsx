import React from "react";
import { MessageDescriptor, useIntl } from "react-intl";

import { Button, Icon } from "~/components/atoms";
import type { ActivityStatus as ActivityStatusType } from "~/features/activities";

type ActivityStatusProps = {
  status: ActivityStatusType | "disabled";
  todoLabel?: MessageDescriptor;
  action?: () => void;
} & Omit<React.ComponentPropsWithoutRef<"div">, "children">;

export const ActivityStatus: React.FunctionComponent<ActivityStatusProps> = (
  props
) => {
  const { status, todoLabel, action, ...divProps } = props;

  const i18n = useIntl();

  const iconType =
    status === "completed"
      ? "verida-tick"
      : status === "pending"
      ? "loading"
      : undefined;

  const activityTodoStatusLabel = i18n.formatMessage({
    id: "ActivityStatus.activityTodoStatusLabel",
    description: "Label of the status for an activity to perform",
    defaultMessage: "Start",
  });
  const activityPendingStatusLabel = i18n.formatMessage({
    id: "ActivityStatus.activityPendingStatusLabel",
    description: "Label of the status for a pending activity",
    defaultMessage: "Pending",
  });
  const activityCompletedStatusLabel = i18n.formatMessage({
    id: "ActivityStatus.activityCompletedStatusLabel",
    description: "Label of the status for a completed activity",
    defaultMessage: "Completed",
  });
  const activityDisabledLabel = i18n.formatMessage({
    id: "ActivityStatus.activityDisabledLabel",
    description: "Label of the status for a disabled activity",
    defaultMessage: "Coming Soon",
  });

  const label =
    status === "completed"
      ? activityCompletedStatusLabel
      : status === "pending"
      ? activityPendingStatusLabel
      : status === "todo"
      ? todoLabel
        ? i18n.formatMessage(todoLabel)
        : activityTodoStatusLabel
      : activityDisabledLabel;

  return (
    <div {...divProps}>
      {status === "todo" ? (
        <Button onClick={action}>
          {iconType && <Icon type={iconType} />}
          {label}
        </Button>
      ) : (
        <div className="p-2.5 rounded-xl border border-solid border-gray-dark flex items-center justify-center gap-2 font-medium">
          {iconType && (
            <Icon
              type={iconType}
              className={status === "pending" ? "animate-spin-slow" : undefined}
            />
          )}
          {label}
        </div>
      )}
    </div>
  );
};

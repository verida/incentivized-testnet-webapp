import React from "react";
import { useIntl } from "react-intl";

import { Chip, ChipVariants, Icon } from "~/components/atoms";
import type { UserActivityStatus } from "~/features/activity";

export type ActivityStatusProps = {
  status: UserActivityStatus | "disabled" | "checking";
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const ActivityStatus: React.FunctionComponent<ActivityStatusProps> = (
  props
) => {
  const { status, ...divProps } = props;

  const i18n = useIntl();

  const activityTodoStatusLabel = i18n.formatMessage({
    id: "ActivityStatus.activityTodoStatusLabel",
    description: "Label of the status for an activity to perform",
    defaultMessage: "To do",
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

  const activityCheckingLabel = i18n.formatMessage({
    id: "ActivityStatus.activityCheckingLabel",
    description: "Label of the status for a disabled activity",
    defaultMessage: "Checking",
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
      ? activityTodoStatusLabel
      : status === "checking"
      ? activityCheckingLabel
      : activityDisabledLabel;

  const iconType =
    status === "pending" || status === "checking"
      ? "loading"
      : status === "completed"
      ? "check"
      : undefined;

  const chipVariants: ChipVariants = {
    variant:
      status === "completed"
        ? "success"
        : status === "pending"
        ? "pending"
        : status === "disabled" || status === "checking"
        ? "muted"
        : status === "todo"
        ? "muted"
        : "primary",
  };

  return (
    <div {...divProps}>
      <Chip variant={chipVariants.variant} className="flex gap-2 items-center">
        {iconType ? (
          <Icon
            type={iconType}
            size={16}
            className={
              status === "pending" || status === "checking"
                ? "animate-spin-slow"
                : undefined
            }
          />
        ) : null}
        <span>{label}</span>
      </Chip>
    </div>
  );
};

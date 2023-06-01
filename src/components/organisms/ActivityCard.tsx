import React, { useCallback } from "react";
import { useIntl } from "react-intl";

import { Button } from "~/components/atoms";
import { ActivityStatus } from "~/components/molecules";
import {
  Activity,
  ActivityStatus as ActivityStatusType,
  useActivity,
} from "~/features/activities";
import { useTermsConditions } from "~/features/termsconditions";
import { useVerida } from "~/features/verida";

type ActivityCardProps = {
  index: number;
  activity: Activity;
  status: ActivityStatusType;
} & Omit<React.ComponentPropsWithoutRef<"div">, "children">;

export const ActivityCard: React.FunctionComponent<ActivityCardProps> = (
  props
) => {
  const { index, activity, status, ...divProps } = props;
  const { title, shortDescription, enabled = false } = activity;

  const i18n = useIntl();
  const { connect, isConnected } = useVerida();
  const { status: statusTermsConditions, openAcceptModal } =
    useTermsConditions();
  const { performActivity } = useActivity();

  const handleConnect = useCallback(() => {
    void connect();
  }, [connect]);

  const connectButtonLabel = i18n.formatMessage({
    id: "ActivityCard.connectButtonLabel",
    description: "Label of the Connect button in each activity card",
    defaultMessage: "Connect",
  });

  const openTermsConditionsButtonLabel = i18n.formatMessage({
    id: "ActivityCard.openTermsConditionsButtonLabel",
    description:
      "Label of the button to open the terms and conditions modal on each activity card",
    defaultMessage: "Open Terms of Use",
  });

  const background = enabled ? "bg-primary-15" : "bg-primary-5";
  const textColor = enabled ? "text-primary" : "text-primary/70";

  return (
    <div {...divProps}>
      <div
        className={`p-4 rounded-2xl flex flex-col md:flex-row justify-between gap-4 ${background} ${textColor}`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 items-baseline">
            <div className="bg-primary-15 aspect-square h-8 rounded-full flex justify-center items-center">
              {index}
            </div>
            <p className="text-xl font-semibold">{title}</p>
          </div>
          <div>
            <p>{shortDescription}</p>
          </div>
        </div>
        <div className="flex flex-row md:flex-col justify-center whitespace-nowrap">
          {enabled ? (
            isConnected ? (
              statusTermsConditions === "accepted" ? (
                <ActivityStatus
                  status={status}
                  todoLabel={activity.actionLabel}
                  action={() => void performActivity(activity.id)}
                />
              ) : (
                <Button onClick={openAcceptModal} size="medium">
                  {openTermsConditionsButtonLabel}
                </Button>
              )
            ) : (
              <Button onClick={handleConnect} size="medium">
                {connectButtonLabel}
              </Button>
            )
          ) : (
            <ActivityStatus status="disabled" />
          )}
        </div>
      </div>
    </div>
  );
};

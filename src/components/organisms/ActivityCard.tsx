import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";

import { Button, Typography } from "~/components/atoms";
import { ActivityStatus } from "~/components/molecules";
import { Activity, UserActivityStatus, useActivity } from "~/features/activity";
import { Sentry } from "~/features/sentry";
import { useTermsConditions } from "~/features/termsconditions";
import { useVerida } from "~/features/verida";

type ActivityCardProps = {
  index: number;
  activity: Activity;
  status: UserActivityStatus;
} & Omit<React.ComponentPropsWithoutRef<"section">, "children">;

export const ActivityCard: React.FunctionComponent<ActivityCardProps> = (
  props
) => {
  const { index, activity, status, ...sectionProps } = props;
  const { title, shortDescription, enabled = false } = activity;

  const i18n = useIntl();
  const { connect, isConnected } = useVerida();
  const {
    status: statusTermsConditions,
    isCheckingStatus: isCheckingTermsConditions,
    openAcceptModal,
  } = useTermsConditions();
  const { executeActivity } = useActivity();
  const [executing, setExecuting] = useState(false);

  const isChecking = isCheckingTermsConditions;

  const handleConnect = useCallback(() => {
    void connect();
  }, [connect]);

  const handleExecuteActivity = useCallback(async () => {
    setExecuting(true);
    try {
      await executeActivity(activity.id);
    } catch (error: unknown) {
      Sentry.captureException(error, {
        tags: {
          activityId: activity.id,
        },
      });
    } finally {
      setExecuting(false);
    }
  }, [executeActivity, activity.id]);

  const resourcesSectionTitle = i18n.formatMessage({
    id: "ActivityCard.resourcesSectionTitle",
    description: "Title of the resources section in each activity card",
    defaultMessage: "Learn:",
  });

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
    <section {...sectionProps}>
      <div
        className={`p-4 rounded-2xl flex flex-col sm:flex-row justify-between gap-4 ${background} ${textColor}`}
      >
        <div className="flex flex-col gap-4">
          <header className="flex flex-row gap-4 items-baseline">
            <div className="bg-primary-15 aspect-square h-8 rounded-full flex justify-center items-center">
              {index}
            </div>
            <h4 className="text-xl font-semibold">
              {i18n.formatMessage(title)}
            </h4>
          </header>
          <div>
            <Typography>{i18n.formatMessage(shortDescription)}</Typography>
          </div>
          {enabled && activity.resources && activity.resources.length > 0 ? (
            <aside>
              <p className="font-semibold text-primary/70">
                {resourcesSectionTitle}
              </p>
              <ul>
                {activity.resources.map((resource, index) => (
                  <li key={index}>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {i18n.formatMessage(resource.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>
        <div className="flex flex-row sm:flex-col justify-center whitespace-nowrap">
          {enabled ? (
            isConnected ? (
              isChecking ? (
                <ActivityStatus status="checking" />
              ) : statusTermsConditions === "accepted" ? (
                status === "todo" ? (
                  <Button
                    size="medium"
                    onClick={() => void handleExecuteActivity()}
                    disabled={executing}
                  >
                    {executing
                      ? i18n.formatMessage(activity.actionExecutingLabel)
                      : i18n.formatMessage(activity.actionLabel)}
                  </Button>
                ) : (
                  <ActivityStatus status={status} />
                )
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
    </section>
  );
};

import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { useDebouncedCallback } from "use-debounce";

import { ActivityIndex, Button, Icon, Typography } from "~/components/atoms";
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
  const { connect, isConnected, isConnecting, isCheckingConnection } =
    useVerida();
  const {
    status: statusTermsConditions,
    isCheckingStatus: isCheckingTermsConditions,
    openAcceptModal,
  } = useTermsConditions();
  const { executeActivity, isLoadingUserActivities } = useActivity();
  const [executing, setExecuting] = useState(false);

  const isChecking = isCheckingTermsConditions || isLoadingUserActivities;

  const handleConnect = useCallback(() => {
    void connect();
  }, [connect]);

  const handleExecuteActivity = useDebouncedCallback(
    async () => {
      setExecuting(true);
      try {
        // executeActivity handlers errors by itself but surrounding by try/catch just in case something has been forgotten
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
    },
    1000,
    {
      leading: true,
    }
  );

  const resourcesSectionTitle = i18n.formatMessage({
    id: "ActivityCard.resourcesSectionTitle",
    description: "Title of the resources section in each activity card",
    defaultMessage: "Resources",
  });

  const connectButtonLabel = i18n.formatMessage({
    id: "ActivityCard.connectButtonLabel",
    description: "Label of the Connect button in each activity card",
    defaultMessage: "Connect",
  });

  const connectingButtonLabel = i18n.formatMessage({
    id: "ActivityCard.connectingButtonLabel",
    description:
      "Label of the disabled Connecting button in each activity card",
    defaultMessage: "Connecting",
  });

  const checkingConnectionButtonLabel = i18n.formatMessage({
    id: "ActivityCard.checkingConnectionButtonLabel",
    description:
      "Label of the disabled Checking Verida  button in each activity card",
    defaultMessage: "Checking Verida",
  });

  const openTermsConditionsButtonLabel = i18n.formatMessage({
    id: "ActivityCard.openTermsConditionsButtonLabel",
    description:
      "Label of the button to open the terms and conditions modal on each activity card",
    defaultMessage: "Open Terms of Use",
  });

  const background = enabled ? "bg-transparent-15" : "bg-transparent-5";
  const textColor = enabled ? "text-foreground" : "text-muted-foreground";

  return (
    <section {...sectionProps}>
      <div
        className={`p-4 rounded-2xl flex flex-col sm:flex-row justify-between gap-4 ${background} ${textColor}`}
      >
        <div className="flex flex-col gap-4">
          <header className="flex flex-row gap-4 items-baseline">
            <ActivityIndex index={String(index)} />
            <Typography component="h4" variant="heading-s">
              {i18n.formatMessage(title)}
            </Typography>
          </header>
          <div>
            <Typography>{i18n.formatMessage(shortDescription)}</Typography>
          </div>
          {enabled && activity.resources && activity.resources.length > 0 ? (
            <aside>
              <p className="font-semibold text-opacity-70">
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
              <Button
                onClick={handleConnect}
                disabled={isConnecting || isCheckingConnection}
                size="medium"
              >
                {isConnecting || isCheckingConnection ? (
                  <Icon type="loading" className="animate-spin-slow mr-2" />
                ) : null}
                {isCheckingConnection
                  ? checkingConnectionButtonLabel
                  : isConnecting
                  ? connectingButtonLabel
                  : connectButtonLabel}
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

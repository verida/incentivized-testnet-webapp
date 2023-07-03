import React, { useState } from "react";
import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";
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
  const { isConnected } = useVerida();
  const {
    status: statusTermsConditions,
    isCheckingStatus: isCheckingTermsConditions,
    openAcceptModal,
  } = useTermsConditions();
  const { executeActivity, isLoadingUserActivities } = useActivity();
  const [executing, setExecuting] = useState(false);

  const isChecking = isCheckingTermsConditions || isLoadingUserActivities;

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

  const openTermsConditionsButtonLabel = i18n.formatMessage({
    id: "ActivityCard.openTermsConditionsButtonLabel",
    description:
      "Label of the button to open the terms and conditions modal on each activity card",
    defaultMessage: "Open Terms of Use",
  });

  const backgroundClasses =
    enabled && status !== "completed"
      ? "bg-transparent-10"
      : "bg-transparent-3";
  const textColorClasses =
    enabled && status !== "completed"
      ? "text-foreground"
      : "text-muted-foreground";
  const borderClasses = enabled
    ? undefined
    : "border border-dashed border-border";

  return (
    <section {...sectionProps}>
      <div
        className={twMerge(
          "p-4 rounded-xl flex flex-col gap-4",
          backgroundClasses,
          textColorClasses,
          borderClasses
        )}
      >
        <header className="flex flex-row gap-4 items-baseline">
          <ActivityIndex index={String(index)} />
          <Typography component="h4" variant="heading-s">
            {i18n.formatMessage(title)}
          </Typography>
        </header>
        <div>
          <Typography className="text-muted-foreground">
            {i18n.formatMessage(shortDescription)}
          </Typography>
        </div>
        {enabled && activity.resources && activity.resources.length > 0 ? (
          <aside>
            <p className="font-semibold text-muted-foreground">
              {/* TODO: Use Typography */}
              {resourcesSectionTitle}
            </p>
            <ul>
              {activity.resources.map((resource, index) => (
                <li key={index}>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-muted-foreground hover:text-foreground"
                  >
                    {i18n.formatMessage(resource.label)}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
        <footer className="flex justify-between items-center">
          <div>
            {enabled ? (
              isConnected ? (
                <ActivityStatus
                  status={isLoadingUserActivities ? "checking" : status}
                />
              ) : null
            ) : (
              <ActivityStatus status="disabled" />
            )}
          </div>
          {enabled ? (
            <div>
              {isConnected ? (
                isChecking ? null : statusTermsConditions === "accepted" ? (
                  status === "todo" ? (
                    <Button
                      size="medium"
                      onClick={() => void handleExecuteActivity()}
                      disabled={executing}
                    >
                      {executing ? (
                        <>
                          <Icon
                            type="loading"
                            className="animate-spin-slow mr-2"
                          />
                          {i18n.formatMessage(activity.actionExecutingLabel)}
                        </>
                      ) : (
                        i18n.formatMessage(activity.actionLabel)
                      )}
                    </Button>
                  ) : null
                ) : (
                  <Button onClick={openAcceptModal} size="medium">
                    {openTermsConditionsButtonLabel}
                  </Button>
                )
              ) : null}
            </div>
          ) : null}
        </footer>
      </div>
    </section>
  );
};

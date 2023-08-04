import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";
import { useDebouncedCallback } from "use-debounce";

import {
  ActivityIndex,
  Button,
  Chip,
  ExternalLink,
  Icon,
  Typography,
} from "~/components/atoms";
import { ActivityStatus, CopyToClipboardButton } from "~/components/molecules";
import {
  type Activity,
  type UserActivity,
  useActivity,
} from "~/features/activity";
import { Sentry } from "~/features/sentry";
import { useTermsConditions } from "~/features/termsconditions";
import { useVerida } from "~/features/verida";

export type ActivityCardProps = {
  index: number;
  activity: Activity;
  userActivity?: UserActivity;
} & Omit<React.ComponentPropsWithRef<"section">, "children">;

export const ActivityCard: React.FunctionComponent<ActivityCardProps> = (
  props
) => {
  const { index, activity, userActivity, ...sectionProps } = props;
  const {
    title,
    shortDescription,
    longDescription,
    enabled = false,
  } = activity;
  const status = userActivity?.status || "todo";

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

  const xpPointsChipLabel = i18n.formatMessage(
    {
      id: "ActivityCard.xpPointsChipLabel",
      description: "Label of the XP points chip on each activity card",
      defaultMessage: "{points} XP",
    },
    { points: activity.points }
  );

  const connectToCompleteMessage = i18n.formatMessage({
    id: "ActivityCard.connectToCompleteMessage",
    description: "Message to show when the user is not connected",
    defaultMessage: "Connect for details",
  });

  const referralLinkCopiedToClipboardToastMessage = i18n.formatMessage({
    id: "ActivityCard.referralLinkCopiedToClipboardToastMessage",
    description:
      "Toast message displayed after successfully copying the referral link to the user's clipboard",
    defaultMessage: "Your referral link has been copied to your clipboard",
  });

  const handleCopyToClipboard = useCallback(() => {
    toast.success(referralLinkCopiedToClipboardToastMessage, { icon: null });
  }, [referralLinkCopiedToClipboardToastMessage]);

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
          "p-3 sm:p-4 rounded-xl flex flex-col gap-3 sm:gap-4",
          backgroundClasses,
          textColorClasses,
          borderClasses
        )}
      >
        <header className="flex flex-col gap-3 items-start justify-center sm:justify-start sm:flex-row sm:gap-4 sm:items-center">
          <ActivityIndex index={String(index)} />
          <Typography component="h4" variant="heading-s">
            {i18n.formatMessage(title)}
          </Typography>
        </header>
        <div>
          <Typography className="text-muted-foreground">
            {i18n.formatMessage(
              isConnected ? longDescription : shortDescription,
              {
                newline: (
                  <>
                    <br />
                  </>
                ),
              }
            )}
          </Typography>
        </div>
        {isConnected &&
        enabled &&
        activity.resources &&
        activity.resources.length > 0 ? (
          <aside className="text-muted-foreground">
            <Typography variant="subtitle">{resourcesSectionTitle}</Typography>
            <ul>
              {activity.resources.map((resource, index) => (
                <li key={index}>
                  <ExternalLink href={resource.url} openInNewTab>
                    {i18n.formatMessage(resource.label)}
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
        {userActivity?.data?.referralLink ? (
          <div className="flex items-center gap-2">
            <Typography className="truncate">
              {userActivity.data.referralLink}
            </Typography>
            <CopyToClipboardButton
              value={userActivity.data.referralLink}
              onCopy={handleCopyToClipboard}
            />
          </div>
        ) : null}
        <footer className="flex flex-col sm:flex-row items-start gap-4 justify-between sm:items-end">
          <div className="flex gap-2 items-center">
            {enabled ? (
              <>
                <Chip variant="primary">{xpPointsChipLabel}</Chip>
                {isConnected &&
                (isLoadingUserActivities || status !== "todo") ? (
                  <ActivityStatus
                    status={isLoadingUserActivities ? "checking" : status}
                  />
                ) : null}
              </>
            ) : (
              <ActivityStatus status="disabled" />
            )}
          </div>
          {enabled ? (
            <>
              {isConnected ? (
                isChecking ? null : statusTermsConditions === "accepted" ? (
                  status === "todo" || status === "pending" ? (
                    <Button
                      size="medium"
                      onClick={() => void handleExecuteActivity()}
                      disabled={executing}
                      className="w-full sm:w-fit"
                    >
                      {executing ? (
                        <>
                          <Icon
                            size={20}
                            type="loading"
                            className="animate-spin-slow"
                          />
                          {i18n.formatMessage(activity.actionExecutingLabel)}
                        </>
                      ) : status === "pending" &&
                        activity.actionReExecuteLabel ? (
                        i18n.formatMessage(activity.actionReExecuteLabel)
                      ) : (
                        i18n.formatMessage(activity.actionLabel)
                      )}
                    </Button>
                  ) : null
                ) : (
                  <Button
                    onClick={openAcceptModal}
                    size="medium"
                    className="w-full sm:w-fit"
                  >
                    {openTermsConditionsButtonLabel}
                  </Button>
                )
              ) : (
                <Typography className="w-full text-left sm:text-right text-muted-foreground">
                  {connectToCompleteMessage}
                </Typography>
              )}
            </>
          ) : null}
        </footer>
      </div>
    </section>
  );
};

import { useCallback, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

import { BottomBarBase, Button, Typography } from "~/components/atoms";
import {
  ActivityStatus,
  PartnerCircledLogo,
  StackedDiv,
  XpPointsChip,
} from "~/components/molecules";
import { ActivityStepCard, ResourcesSection } from "~/components/organisms";
import { PageLayout } from "~/components/templates";
import { useActivity } from "~/features/activity";
import { isOnboardingMission } from "~/features/missions";
import { useVerida } from "~/features/verida";

export const ActivityPage: React.FC = () => {
  const { activityId = "" } = useParams();

  const { isConnected } = useVerida();

  const {
    activities,
    isLoadingUserActivities,
    getUserActivity,
    executeActivity,
  } = useActivity();

  const [isExecuting, setIsExecuting] = useState(false);

  const activity = useMemo(
    () => activities.find((activity) => activity.id === activityId),
    [activities, activityId]
  );

  const handleExecuteActivity = useDebouncedCallback(
    async () => {
      setIsExecuting(true);
      await executeActivity(activityId);
      setIsExecuting(false);
    },
    1000,
    { leading: true }
  );

  const handleExecuteButtonClick = useCallback(() => {
    void handleExecuteActivity();
  }, [handleExecuteActivity]);

  const userActivity = useMemo(
    () => getUserActivity(activityId),
    [activityId, getUserActivity]
  );

  const i18n = useIntl();

  const notFoundMessage = i18n.formatMessage({
    id: "ActivityPage.emptyMessage",
    description: "Message when activity doesn't exist",
    defaultMessage: "No data",
  });

  if (!activity) {
    /* TODO: Rework the not found state */
    return <div>{notFoundMessage}</div>;
  }

  const activityTitle = i18n.formatMessage(activity.title);

  const description = i18n.formatMessage(activity.shortDescription, {
    newline: (
      <>
        <br />
      </>
    ),
  });

  const activitySteps = activity.steps?.map((step) => i18n.formatMessage(step));

  const activityByLabel = i18n.formatMessage({
    id: "ActivityPage.activityByLabel",
    defaultMessage: "Activity by",
    description: "Label activity by",
  });

  const rewardLabel = i18n.formatMessage({
    id: "ActivityPage.rewardLabel",
    defaultMessage: "Reward",
    description: "Label Reward",
  });

  const connectToCompleteMessage = i18n.formatMessage({
    id: "ActivityPage.connectToCompleteMessage",
    description: "Message to show when the user is not connected",
    defaultMessage: "Connect for details",
  });

  const partnerLogos = activity.partners.map((partner) => (
    <PartnerCircledLogo partnerId={partner} />
  ));

  return (
    <PageLayout
      hideReportIssueButton
      title={activityTitle}
      titleClassName="max-w-[calc(1264px_-_29rem)] text-left"
    >
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="max-w-[calc(1264px_-_29rem)] flex flex-col gap-6">
          {partnerLogos.length > 0 ? (
            <div className="flex flex-row py-2 gap-4 sm:gap-6 items-center justify-stretch">
              <div className="flex flex-row items-center gap-3 sm:gap-4">
                <Typography variant="base-s">{activityByLabel}</Typography>
                <StackedDiv divs={partnerLogos} />
              </div>
              {/* TODO: Add countdown chip */}
            </div>
          ) : null}
          <Typography className="text-muted-foreground">
            {description}
          </Typography>
          {activity.resources ? (
            <ResourcesSection resources={activity.resources} />
          ) : null}
          <div className="pt-8 flex flex-col gap-10 md:gap-16">
            {activitySteps?.map((step, index) => (
              <ActivityStepCard
                key={index}
                index={index + 1}
                step={step}
                theme={
                  isOnboardingMission(activity.missionId)
                    ? "onboarding"
                    : "default"
                }
              />
            ))}
          </div>
        </div>
        <footer className="sticky bottom-4 sm:bottom-6 max-w-[calc(1264px_-_12rem)] w-full">
          <BottomBarBase>
            <div className="p-4 lg:px-6 lg:py-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex flex-row grow justify-between items-center">
                  <div className="flex flex-row items-center gap-3">
                    <Typography>{rewardLabel}</Typography>
                    <XpPointsChip nbXpPoints={activity.points} />
                  </div>
                  {isConnected && userActivity ? (
                    <ActivityStatus
                      status={
                        isLoadingUserActivities
                          ? "checking"
                          : userActivity.status
                      }
                    />
                  ) : null}
                </div>
                {isConnected ? (
                  userActivity?.status !== "completed" && !activity.ended ? (
                    <Button
                      color="primary"
                      className="w-full sm:w-fit"
                      onClick={handleExecuteButtonClick}
                      disabled={isLoadingUserActivities || isExecuting}
                    >
                      {i18n.formatMessage(
                        isExecuting
                          ? activity.actionExecutingLabel
                          : activity.actionLabel
                      )}
                    </Button>
                  ) : null
                ) : (
                  <Typography className="text-muted-foreground">
                    {connectToCompleteMessage}
                  </Typography>
                )}
              </div>
            </div>
          </BottomBarBase>
        </footer>
      </div>
    </PageLayout>
  );
};

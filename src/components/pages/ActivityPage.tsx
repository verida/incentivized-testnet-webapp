import { useMemo, useState } from "react";
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
import {
  ActivityStatus as ActivityStatusType,
  useActivity,
} from "~/features/activity";
import { isOnboardingMission } from "~/features/missions";
import { useVerida } from "~/features/verida";

export const ActivityPage: React.FC = () => {
  const i18n = useIntl();

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
    [activities]
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

  const userActivity = useMemo(
    () => getUserActivity(activityId),
    [activityId, getUserActivity]
  );

  const notFoundMessage = i18n.formatMessage({
    id: "ActivityPage.emptyMessage",
    description: "Message when activity doesn't exist",
    defaultMessage: "No data",
  });

  if (!activity) {
    /* TODO: Rework the not found state */
    return <div>{notFoundMessage}</div>;
  }

  const titleMessage = i18n.formatMessage(activity.title);
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

  const statusLabel = i18n.formatMessage({
    id: "ActivityPage.statusLabel",
    defaultMessage: "Status",
    description: "Label Status",
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
      title={titleMessage}
      titleClassName="max-w-[calc(1264px_-_29rem)] text-left"
    >
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="max-w-[calc(1264px_-_29rem)] flex flex-col gap-6">
          <div className="flex flex-row py-2 gap-4 sm:gap-6 items-center justify-stretch">
            {partnerLogos.length > 0 ? (
              <>
                <div className="flex flex-row items-center gap-3 sm:gap-4">
                  <Typography variant={"base-s"}>{activityByLabel}</Typography>
                  <StackedDiv divs={partnerLogos} />
                </div>
              </>
            ) : null}
            {/* TODO: Add countdown chip */}
          </div>
          <Typography className="text-muted-foreground">
            {description}
          </Typography>
          {activity.resources ? (
            <ResourcesSection resources={activity.resources} />
          ) : null}
          <div className="pt-8 flex flex-col gap-10 md:gap-16">
            {activitySteps?.map((step, index) => (
              <ActivityStepCard
                index={index + 1}
                step={step}
                theme={
                  isOnboardingMission(activity.missionId)
                    ? "onboarding"
                    : "default"
                }
                key={index}
              />
            ))}
          </div>
        </div>
        <footer className="sticky bottom-4 sm:bottom-6 max-w-[calc(1264px_-_12rem)] w-full">
          <BottomBarBase>
            <div className="p-4 lg:px-6 lg:py-4">
              <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
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
                      className="h-12 w-full md:w-auto"
                      onClick={() => void handleExecuteActivity()}
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

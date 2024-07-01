import { useState } from "react";
import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

import { Button, Typography } from "~/components/atoms";
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

export const ActivityPage: React.FC = () => {
  const i18n = useIntl();

  const { activityId = "" } = useParams();

  const {
    activities,
    isLoadingUserActivities,
    getUserActivity,
    executeActivity,
  } = useActivity();

  const [isExecuting, setIsExecuting] = useState(false);

  const activity = activities.find((activity) => activity.id === activityId);

  const handleExecuteActivity = useDebouncedCallback(
    async () => {
      setIsExecuting(true);
      await executeActivity(activityId);
      setIsExecuting(false);
    },
    1000,
    { leading: true }
  );

  if (!activity) {
    return null;
  }

  const userActivity = getUserActivity(activityId);

  const titleMessage = i18n.formatMessage(activity.title);
  const shortDescriptionMessage = i18n.formatMessage(
    activity.shortDescription,
    {
      newline: (
        <>
          <br />
        </>
      ),
    }
  );
  const longDescriptionMessage = i18n.formatMessage(activity.longDescription);
  const finishStepsMessage = i18n.formatMessage({
    id: "ActivityPage.finishStepsMessage",
    defaultMessage:
      "Once you've finished with all steps, click the 'Verify' button below.",
    description: "Message for what to do after finishing all steps",
  });

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

  const activitySteps = longDescriptionMessage
    .split(/Step \d+\. /)
    .slice(1)
    .map((step) => step.replaceAll("{newline}", ""));

  const partnerLogos = activity.partners.map((partner) => (
    <PartnerCircledLogo partnerId={partner} />
  ));

  return (
    <PageLayout
      hideReportIssueButton
      title={titleMessage}
      titleClassName="max-w-[calc(1264px_-_29rem)] text-left text-white"
    >
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-[calc(1264px_-_29rem)]">
          <div className="flex py-2 mb-3">
            {partnerLogos.length > 0 ? (
              <>
                <div className="flex items-center">
                  <Typography variant={"base-s"} className="mr-4">
                    {activityByLabel}
                  </Typography>
                  <StackedDiv divs={partnerLogos} />
                  <div className="w-px h-full bg-transparent-15 mx-6" />
                </div>
              </>
            ) : null}
            <div className="flex gap-4 items-center">
              <Typography variant={"base-s"}>{statusLabel}</Typography>
              <ActivityStatus
                status={
                  activity.ended ? "ended" : userActivity?.status ?? "checking"
                }
              />
            </div>
          </div>
          <div className="text-muted-foreground mb-10">
            <Typography>{shortDescriptionMessage}</Typography>
            <br />
            <Typography>{finishStepsMessage}</Typography>
          </div>
          {activity.resources ? (
            <ResourcesSection resources={activity.resources} />
          ) : null}
          <div className="mt-24 md:mt-14 flex flex-col gap-10 md:gap-16">
            {activitySteps?.map((step, index) => (
              <ActivityStepCard
                index={index}
                step={step}
                isOnboardingActivity={isOnboardingMission(activity.missionId)}
                key={index}
              />
            ))}
          </div>
        </div>
        <footer className="sticky mt-10 bottom-4 sm:bottom-6 max-w-[calc(1264px_-_12rem)] w-full">
          <div className="p-4 lg:px-6 lg:py-4 rounded-xl lg:rounded-2xl backdrop-blur-xl border border-border bg-clip-border bg-gradient-to-r from-primary/25 to-primary/10">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
              <div className="flex grow justify-between items-center">
                <div className="flex items-center gap-3">
                  <Typography>{rewardLabel}</Typography>
                  <XpPointsChip nbXpPoints={activity.points} />
                </div>
                <ActivityStatus
                  status={
                    activity.ended
                      ? "ended"
                      : userActivity?.status ?? "checking"
                  }
                />
              </div>
              {userActivity?.status !== "completed" && !activity.ended ? (
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
              ) : null}
            </div>
          </div>
        </footer>
      </div>
    </PageLayout>
  );
};

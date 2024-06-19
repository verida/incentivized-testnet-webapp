import { useIntl } from "react-intl";
import { useParams } from "react-router-dom";

import { Button, Typography } from "~/components/atoms";
import { PartnerCircledLogo, XpPointsChip } from "~/components/molecules";
import { ActivityStepCard } from "~/components/organisms";
import { PageLayout } from "~/components/templates";
import { activities } from "~/features/activity";
import { isOnboardingMission } from "~/features/missions";

export const ActivityPage: React.FC = () => {
  const i18n = useIntl();

  const { activityId = "" } = useParams();
  const activity = activities.find((activity) => activity.id === activityId);

  if (!activity) {
    return null;
  }

  const titleMessage = i18n.formatMessage(activity.title);
  const shortDescriptionMessage = i18n.formatMessage(activity.shortDescription);
  const longDescriptionMessage = i18n.formatMessage(activity.longDescription);
  const finishStepsMessage = i18n.formatMessage({
    id: "ActivityPage.finishStepsMessage",
    defaultMessage:
      "Once you've finished with all steps, click the 'Verify' button below.",
    description: "Message for what to do after finishing all steps",
  });

  const verifyButtonLabel = i18n.formatMessage({
    id: "ActivityPage.verifyButtonLabel",
    defaultMessage: "Verify",
    description: "Label on the verify button",
  });

  const activityByLabel = i18n.formatMessage({
    id: "ActivityPage.activityByLabel",
    defaultMessage: "Activity by",
    description: "Label activity by",
  });

  const polygonLabel = i18n.formatMessage({
    id: "ActivityPage.polygonLabel",
    defaultMessage: "Polygon",
    description: "Label Polygon",
  });

  const activitySteps = longDescriptionMessage
    .split(/Step \d+\. /)
    .slice(1)
    .map((step) => step.replaceAll("{newline}", ""));

  return (
    <PageLayout
      hideReportIssueButton
      title={titleMessage}
      titleClassName="max-w-[calc(1264px_-_29rem)] text-left text-white"
    >
      <div className="flex flex-col justify-center items-center">
        <div className="max-w-[calc(1264px_-_29rem)]">
          <div className="text-muted-foreground">
            <Typography>{shortDescriptionMessage}</Typography>
            <br />
            <Typography>{finishStepsMessage}</Typography>
          </div>
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
              <div className="flex grow gap-4 items-center">
                {activity.partners.length > 0 ? (
                  <>
                    <PartnerCircledLogo partnerId={activity.partners[0]} />
                    <div className="flex justify-between items-center grow">
                      <div className="flex flex-col justify-between">
                        <Typography variant={"base-s"}>
                          {activityByLabel}
                        </Typography>
                        <Typography variant={"heading-s"}>
                          {polygonLabel}
                        </Typography>
                      </div>
                    </div>
                  </>
                ) : null}
                <XpPointsChip nbXpPoints={activity.points} />
              </div>
              <Button color="primary" className="h-12">
                {verifyButtonLabel}
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </PageLayout>
  );
};

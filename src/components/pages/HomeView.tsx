import React from "react";
import { useIntl } from "react-intl";

import { Alert, HomeHero } from "~/components/molecules";
import { ActivityCard } from "~/components/organisms";
import { useActivity } from "~/features/activity";
import { useTermsConditions } from "~/features/termsconditions";
import { useVerida } from "~/features/verida";

export const HomeView: React.FunctionComponent = () => {
  const i18n = useIntl();
  const { isConnected } = useVerida();
  const {
    status,
    isCheckingStatus: isCheckingTermsConditions,
    openAcceptModal,
  } = useTermsConditions();
  const { activities, getUserActivity } = useActivity();

  const displayTermsConditionsAlert =
    isConnected && status !== "accepted" && !isCheckingTermsConditions;

  const activitiesTitle = i18n.formatMessage({
    id: "HomeView.activitiesTitle",
    defaultMessage: "Activities",
    description: "Title for the activities section",
  });

  const termsConditionsAlertMessage = i18n.formatMessage({
    id: "HomeView.termsConditionsAlertMessage",
    defaultMessage: "You must accept the Terms of Use",
    description: "Message for the terms and conditions alert",
  });

  const termsConditionsAlertAcceptButtonLabel = i18n.formatMessage({
    id: "HomeView.termsConditionsAlertAcceptButtonLabel",
    defaultMessage: "Open Terms of Use",
    description: "Label for the accept button",
  });

  return (
    <div>
      <HomeHero />
      {displayTermsConditionsAlert && (
        <Alert
          className="mt-6"
          message={termsConditionsAlertMessage}
          actionLabel={termsConditionsAlertAcceptButtonLabel}
          action={openAcceptModal}
          type="warning"
        />
      )}
      <div className="mt-6">
        <h3 className="text-2xl font-bold">{activitiesTitle}</h3>
        <ul className="flex flex-col w-full gap-4 mt-4">
          {activities.sort().map((activity, index) => (
            <li key={activity.id}>
              <ActivityCard
                index={index + 1}
                activity={activity}
                status={getUserActivity(activity.id)?.status || "todo"}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

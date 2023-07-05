import React from "react";
import { useIntl } from "react-intl";

import { Alert, HomeHero } from "~/components/molecules";
import { ConnectVeridaButton, MissionSection } from "~/components/organisms";
import { PageLayout } from "~/components/templates";
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
  const { missions } = useActivity();

  const tagline = i18n.formatMessage({
    id: "HomeView.tagline",
    description: "Tag line displayed at the top of the Home page",
    defaultMessage: "Participate, learn, test and get rewarded",
  });

  const displayTermsConditionsAlert =
    isConnected && status !== "accepted" && !isCheckingTermsConditions;

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
    <PageLayout title={tagline}>
      <HomeHero className="mt-4" />
      {isConnected ? null : (
        <div className="mt-6 flex justify-center">
          <ConnectVeridaButton longLabel />
        </div>
      )}
      {displayTermsConditionsAlert && (
        <Alert
          className="mt-6"
          message={termsConditionsAlertMessage}
          actionLabel={termsConditionsAlertAcceptButtonLabel}
          action={openAcceptModal}
          type="warning"
        />
      )}
      <div className="mt-16">
        {missions.map((mission) => (
          <MissionSection
            key={mission.id}
            mission={mission}
            className="mt-16"
          />
        ))}
      </div>
    </PageLayout>
  );
};

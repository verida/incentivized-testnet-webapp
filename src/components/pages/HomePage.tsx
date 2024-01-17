import React from "react";
import { useIntl } from "react-intl";

import { Alert, HomeHero } from "~/components/molecules";
import {
  ConnectVeridaButton,
  MissionSection,
  MissionsSideNavigation,
} from "~/components/organisms";
import { PageLayout } from "~/components/templates";
import { useActivity } from "~/features/activity";
import { useRewards } from "~/features/rewards";
import { useTermsConditions } from "~/features/termsconditions";
import { useVerida } from "~/features/verida";

export const HomePage: React.FunctionComponent = () => {
  const i18n = useIntl();
  const { isConnected } = useVerida();
  const {
    status,
    isCheckingStatus: isCheckingTermsConditions,
    openAcceptModal,
  } = useTermsConditions();
  const { missions } = useActivity();
  const {
    openModal: openRewardsModal,
    isClaimExists,
    isCheckingClaimExists,
  } = useRewards();

  const tagline = i18n.formatMessage({
    id: "HomePage.tagline",
    description: "Tag line displayed at the top of the Home page",
    defaultMessage: "Explore a new era of data ownership",
  });

  const displayTermsConditionsAlert =
    isConnected && status !== "accepted" && !isCheckingTermsConditions;

  const termsConditionsAlertMessage = i18n.formatMessage({
    id: "HomePage.termsConditionsAlertMessage",
    defaultMessage: "You must accept the Terms of Use",
    description: "Message for the terms and conditions alert",
  });

  const termsConditionsAlertAcceptButtonLabel = i18n.formatMessage({
    id: "HomePage.termsConditionsAlertAcceptButtonLabel",
    defaultMessage: "Open Terms of Use",
    description: "Label for the terms and conditions alert button",
  });

  const rewardsAlertMessage = i18n.formatMessage({
    id: "HomePage.rewardsAlertMessage",
    defaultMessage: "Submit your wallet address to convert your XP points!",
    description: "Message for the rewards alert",
  });

  const rewardsAlertAcceptButtonLabel = i18n.formatMessage({
    id: "HomePage.rewardsAlertAcceptButtonLabel",
    defaultMessage: "More",
    description: "Label for the rewards alert button",
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
      {isConnected && !isClaimExists && !isCheckingClaimExists && (
        <Alert
          className="mt-6"
          message={rewardsAlertMessage}
          actionLabel={rewardsAlertAcceptButtonLabel}
          action={openRewardsModal}
          type="info"
        />
      )}
      <div className="mt-16 relative">
        <div className="hidden lg:block absolute top-0 bottom-0 -right-6 translate-x-full w-36 xl:w-64">
          <aside className="sticky top-24">
            <MissionsSideNavigation />
          </aside>
        </div>
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

import React from "react";
import { useIntl } from "react-intl";

import { Button } from "~/components/atoms";
import { Alert, HomeHero } from "~/components/molecules";
import {
  ConnectVeridaButton,
  MissionSection,
  MissionsSideNavigation,
} from "~/components/organisms";
import { PageLayout } from "~/components/templates";
import { useActivity } from "~/features/activity";
import { useTermsConditions } from "~/features/termsconditions";
import { useVerida } from "~/features/verida";

export const HomeView: React.FunctionComponent = () => {
  const i18n = useIntl();
  const { isConnected, did, profile } = useVerida();
  const {
    status,
    isCheckingStatus: isCheckingTermsConditions,
    openAcceptModal,
  } = useTermsConditions();
  const { missions, userActivities, userXpPoints } = useActivity();

  const tagline = i18n.formatMessage({
    id: "HomeView.tagline",
    description: "Tag line displayed at the top of the Home page",
    defaultMessage: "Explore a new era of data ownership",
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

  const submitWalletLabel = i18n.formatMessage({
    id: "SubmitWalletButton.submitWalletButtonLabel",
    description: "",
    defaultMessage: "Submit Wallet",
  });

  const handleSubmitWallet = async (): Promise<void> => {
    const airdropAPI = "http://localhost:8182/add";
    if (userXpPoints < 200) {
      throw new Error("Insufficient XP points");
    }

    if (!userActivities.length) {
      throw new Error(
        "No activities completed, so unable to submit airdrop claim"
      );
    }

    // @todo: Prompt the user for this (or obtain from Verida Wallet??)
    const userWalletAddress = "0x2e6F96d19bA666509eD9B2d65CbaD2Ff541Cc826";

    const payload = {
      did,
      userWalletAddress,
      activityProofs: userActivities,
      profile: {
        name: profile ? profile.name : "",
        country: profile ? profile.country : "",
      },
    };

    console.log(payload);

    try {
      const result = await fetch(airdropAPI, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <PageLayout title={tagline}>
      <Button
        onClick={() => void handleSubmitWallet()}
        color="primary"
        size="medium"
      >
        {submitWalletLabel}
      </Button>
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

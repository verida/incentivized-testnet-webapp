import React from "react";
import { useIntl } from "react-intl";

import { Typography } from "~/components/atoms";
import { Alert, HomeHero } from "~/components/molecules";
import {
  ContinueMissionCardsCarousel,
  ExploreMissionsHomeSection,
  OnboardingHomeSection,
  PartnersHomeSection,
} from "~/components/organisms";
import { PageLayout } from "~/components/templates";
import { APP_TITLE, VDA_TOKEN_PAGE_URL } from "~/constants";
import { MISSION_01_ID, useMissions } from "~/features/missions";

export const HomePage: React.FC = () => {
  const i18n = useIntl();

  const { missions, isMissionCompleted, missionsSortedByCompletionPercentage } =
    useMissions();

  const tagline = i18n.formatMessage({
    id: "HomePage.tagline",
    description: "Tag line displayed at the top of the Home page",
    defaultMessage: "Explore a new era of data ownership",
  });

  const airdropsAndVdaTokenAlertMessage = i18n.formatMessage({
    id: "HomePage.airdropsAndVdaTokenAlertMessage",
    description: "Message displayed in the airdrop alert on the home page",
    defaultMessage:
      "The Verida Storage Credit Token (VDA) is now live. Learn more about the VDA Token and check our airdrops.",
  });

  const airdropsAlertButtonLabel = i18n.formatMessage({
    id: "HomePage.airdropsAlertButtonLabel",
    description:
      "Label for the button in the airdrop/vda token alert to redirect to the airdrops page",
    defaultMessage: "Airdrops",
  });

  const vdaTokenAlertButtonLabel = i18n.formatMessage({
    id: "HomePage.vdaTokenAlertButtonLabel",
    description:
      "Label for the button in the airdrop/vda token alert to redirect to the VDA token page on verida.network",
    defaultMessage: "VDA Token",
  });

  const continueMissionLabel = i18n.formatMessage({
    id: "HomeMissionBeginSection.continueMissionLabel",
    defaultMessage: "Continue where you left of",
    description: "Label for Home Continue Mission Card",
  });

  return (
    <PageLayout
      hideBackButton
      displayGetSupportSection
      displayLearnMoreSection
      containerClassName="bg-homepage"
      contentClassName="px-0"
    >
      <div className="flex flex-col gap-16 items-center">
        <div className="mt-24 flex flex-col gap-16 max-w-screen-sm px-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 items-center text-center">
              <Typography
                variant="base"
                className="leading-[120%] font-semibold text-primary uppercase tracking-[0.07rem] sm:tracking-[0.08rem]"
              >
                {APP_TITLE}
              </Typography>
              <Typography variant="heading-l">
                {/* Had to surround by div because of style conflict with Typography, likely 'text-transparent' */}
                <div className="bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 px-8 sm:px-16 text-center">
                  {tagline}
                </div>
              </Typography>
            </div>
            <HomeHero />
          </div>
          <Alert
            type="info"
            message={airdropsAndVdaTokenAlertMessage}
            actions={[
              {
                type: "link",
                label: airdropsAlertButtonLabel,
                href: "/airdrops",
                internal: true,
              },
              {
                type: "link",
                label: vdaTokenAlertButtonLabel,
                href: VDA_TOKEN_PAGE_URL,
                color: "secondary",
                internal: false,
                openInNewTab: true,
              },
            ]}
          />
        </div>
        <div className="flex flex-col gap-16 lg:gap-20 w-full">
          <OnboardingHomeSection />
          {/* {isMissionCompleted(MISSION_01_ID) ? (
            <ContinueMissionCardsCarousel
              missions={missionsSortedByCompletionPercentage.slice(0, 2)}
              title={continueMissionLabel}
            />
          ) : null} */}
          <ExploreMissionsHomeSection />
          <PartnersHomeSection />
        </div>
      </div>
    </PageLayout>
  );
};

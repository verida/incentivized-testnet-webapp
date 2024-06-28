import React from "react";
import { useIntl } from "react-intl";

import { Typography } from "~/components/atoms";
import { Alert, HomeHero } from "~/components/molecules";
import {
  ConnectVeridaButton,
  ContinueMissionCardsCarousel,
  HomeMissionBeginSection,
  MissionCardsCarousel,
  PartnerCardsCarousel,
} from "~/components/organisms";
import { PageLayout } from "~/components/templates";
import { APP_TITLE, VDA_TOKEN_PAGE_URL } from "~/constants";
import { MISSION_01_ID, useMissions } from "~/features/missions";
import { partners } from "~/features/partners";
import { useVerida } from "~/features/verida";

export const HomePage: React.FC = () => {
  const i18n = useIntl();
  const { isConnected } = useVerida();

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

  const trendingLabel = i18n.formatMessage({
    id: "HomePage.trendingLabel",
    defaultMessage: "Trending",
    description: "Label Trending",
  });

  const newLabel = i18n.formatMessage({
    id: "HomePage.newLabel",
    defaultMessage: "New",
    description: "Label New",
  });

  const partnersLabel = i18n.formatMessage({
    id: "HomePage.partnersLabel",
    defaultMessage: "Partners",
    description: "Label Partners",
  });

  const unlockMoreMissionsLabel = i18n.formatMessage({
    id: "HomePage.unlockMoreMissionsLabel",
    defaultMessage: "Unlock More Missions",
    description: "Label Unlock More Missions",
  });

  return (
    <PageLayout
      hideBackButton
      displayGetSupportSection
      displayLearnMoreSection
      containerClassName="bg-homepage"
    >
      <div className="flex flex-col gap-16 items-center">
        <div className="mt-24 flex flex-col gap-16 max-w-screen-sm">
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
          {/* <div className="flex flex-col gap-16 lg:gap-20 px-6">
            <HomeMissionBeginSection mission={missions[0]} />
          </div> */}
          {/* {isMissionCompleted(MISSION_01_ID) ? (
            <ContinueMissionCardsCarousel
              missions={missionsSortedByCompletionPercentage.slice(0, 2)}
              title={continueMissionLabel}
            />
          ) : null} */}
          {/* <MissionCardsCarousel
            missions={missions}
            title={trendingLabel}
            viewAllButton
            viewAllLink="/missions"
          /> */}
          {/* <MissionCardsCarousel
            missions={missions}
            title={newLabel}
            viewAllButton
            viewAllLink="/missions"
          /> */}
          {/* <PartnerCardsCarousel
            partners={partners}
            title={partnersLabel}
            viewAllButton
            viewAllLink="/partners"
          /> */}
          {/* <MissionCardsCarousel
            missions={missions}
            title={unlockMoreMissionsLabel}
            viewAllButton
            viewAllLink="/missions"
          /> */}
        </div>
      </div>
    </PageLayout>
  );
};

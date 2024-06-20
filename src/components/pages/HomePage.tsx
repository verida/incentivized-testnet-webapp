import React from "react";
import { useIntl } from "react-intl";

import { Typography } from "~/components/atoms";
import { HomeHero } from "~/components/molecules";
import {
  ConnectVeridaButton,
  LegacyMissionSection,
  MissionsSideNavigation,
} from "~/components/organisms";
import { PageLayout } from "~/components/templates";
import { APP_TITLE } from "~/constants";
import { missions } from "~/features/missions";
import { useVerida } from "~/features/verida";

export const HomePage: React.FC = () => {
  const i18n = useIntl();
  const { isConnected } = useVerida();

  const tagline = i18n.formatMessage({
    id: "HomePage.tagline",
    description: "Tag line displayed at the top of the Home page",
    defaultMessage: "Explore a new era of data ownership",
  });

  return (
    <PageLayout
      hideBackButton
      displayGetSupportSection
      displayLearnMoreSection
      containerClassName="bg-homepage"
      contentClassName="max-w-screen-sm sm:px-4 pt-4"
    >
      <div className="flex flex-col justify-center">
        <div className="flex flex-col items-center justify-center text-center w-full mt-24">
          <Typography
            variant="base"
            className="leading-[120%] font-semibold text-primary uppercase tracking-[0.07rem] sm:tracking-[0.08rem]"
          >
            {APP_TITLE}
          </Typography>
          <Typography variant="heading-l" className="mt-3">
            {/* Had to surround by div because of style conflict with Typography, likely 'text-transparent' */}
            <div className="bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 px-8 sm:px-14 text-center">
              {tagline}
            </div>
          </Typography>
        </div>
        <HomeHero className="mt-4" />
        {isConnected ? null : (
          <div className="mt-6 flex justify-center">
            <ConnectVeridaButton longLabel />
          </div>
        )}
        <div className="mt-16 relative">
          <div className="hidden lg:block absolute top-0 bottom-0 -right-6 translate-x-full w-36 xl:w-64">
            <aside className="sticky top-24">
              <MissionsSideNavigation />
            </aside>
          </div>
          {missions.map((mission, index) => (
            <LegacyMissionSection
              key={mission.id}
              mission={mission}
              className={index > 0 ? "mt-16" : ""}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

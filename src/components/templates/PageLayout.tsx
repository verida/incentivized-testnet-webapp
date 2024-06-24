import React from "react";
import { twMerge } from "tailwind-merge";

import { BackButton, Typography } from "~/components/atoms";
import { ReportIssueButton } from "~/components/molecules";
import {
  ExploreMoreMissionsSection,
  GetSupportSection,
  HeaderOffset,
  LearnMoreSection,
} from "~/components/organisms";
import { Mission } from "~/features/missions";

export type PageLayoutProps = {
  title?: string;
  containerClassName?: string;
  contentClassName?: string;

  /**
   * Hides the back button. Default to false as most common case is to show the back button.
   */
  hideBackButton?: boolean;
  /**
   * Hides the report issue button. Default to false as most common case is to show the report issue button.
   */
  hideReportIssueButton?: boolean;

  /**
   * Display the "Get Support" section. Default to false as most common case is to not show the "Get Support" section.
   */
  displayGetSupportSection?: boolean;

  /**
   * Display the "Learn More" section. Default to false as most common case is to not show the "Learn More" section.
   */
  displayLearnMoreSection?: boolean;

  displayExploreMoreMissionsSection?: boolean;
  exploreMoreMissionsFilterPredicate?: (mission: Mission) => boolean;
} & Pick<React.ComponentPropsWithRef<"div">, "children">;

export const PageLayout: React.FC<PageLayoutProps> = (props) => {
  const {
    children,
    title,
    containerClassName,
    contentClassName,
    hideBackButton = false,
    hideReportIssueButton = false,
    displayGetSupportSection = false,
    displayLearnMoreSection = false,
    displayExploreMoreMissionsSection = false,
    exploreMoreMissionsFilterPredicate,
  } = props;

  return (
    <div className="flex-grow flex flex-col">
      <main
        className={twMerge("flex-grow flex flex-col mb-4", containerClassName)}
      >
        <HeaderOffset />
        <div className="flex-grow gap-12 sm:gap-16 flex flex-col ">
          {!hideBackButton || title ? (
            <div className=" mt-6 sm:mt-16 flex flex-col sm:flex-row gap-6 px-4 sm:px-6">
              <div className="sm:flex-1 sm:content-center">
                {hideBackButton ? null : <BackButton />}
              </div>
              {title && (
                <Typography variant="heading-l">
                  {/* Had to surround by div because of style conflict with Typography, likely 'text-transparent' */}
                  <div className="bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 text-center">
                    {title}
                  </div>
                </Typography>
              )}
              <div className="hidden sm:block sm:flex-1"></div>
            </div>
          ) : null}
          <div
            className={twMerge(
              "flex-grow px-4 sm:px-6 max-w-screen-xl self-center w-full",
              // This gives consumer of this component the ability to overwrite the width and horizontal layout
              contentClassName
            )}
          >
            {children}
          </div>
        </div>
      </main>
      {hideReportIssueButton ? null : (
        <div className="sticky bottom-4 sm:bottom-6 left-4 sm:left-6 w-fit mt-4 sm:mt-6">
          <ReportIssueButton />
        </div>
      )}
      {displayGetSupportSection ||
      displayGetSupportSection ||
      displayExploreMoreMissionsSection ? (
        <div className="mt-14 sm:mt-20 flex flex-col items-center">
          {displayExploreMoreMissionsSection ? (
            <ExploreMoreMissionsSection
              filterPredicate={exploreMoreMissionsFilterPredicate}
              className="max-w-screen-xl w-full"
            />
          ) : null}
          {displayGetSupportSection ? (
            <GetSupportSection className="px-4 sm:px-6 max-w-screen-xl w-full" />
          ) : null}
          {displayLearnMoreSection ? (
            <LearnMoreSection className="px-4 sm:px-6 max-w-screen-xl w-full" />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

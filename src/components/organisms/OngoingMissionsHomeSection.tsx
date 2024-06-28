import React from "react";
import { useIntl } from "react-intl";

import { OngoingMissionCardsCarousel } from "~/components/organisms/OngoingMissionCardsCarousel";
import { HomeSectionWrapper } from "~/components/templates";
import { useMissions } from "~/features/missions";

export type OngoingMissionsHomeSectionProps = Omit<
  React.ComponentPropsWithRef<typeof HomeSectionWrapper>,
  "title" | "children"
>;

export const OngoingMissionsHomeSection: React.FC<
  OngoingMissionsHomeSectionProps
> = (props) => {
  const { ...wrapperProps } = props;

  const { missionsSortedByCompletionPercentage } = useMissions();

  const i18n = useIntl();

  const title = i18n.formatMessage({
    id: "OngoingMissionsHomeSection.title",
    defaultMessage: "Continue where you left of",
    description: "Title of the on going missions section on the home page",
  });

  if (missionsSortedByCompletionPercentage.length === 0) {
    return null;
  }

  return (
    <HomeSectionWrapper {...wrapperProps} title={title}>
      <OngoingMissionCardsCarousel
        missions={missionsSortedByCompletionPercentage}
      />
    </HomeSectionWrapper>
  );
};

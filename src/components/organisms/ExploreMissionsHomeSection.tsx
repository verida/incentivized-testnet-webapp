import React, { useMemo } from "react";
import { useIntl } from "react-intl";

import { ButtonLink } from "~/components/atoms";
import { HomeSectionWrapper } from "~/components/molecules";
import { MissionCardsCarousel } from "~/components/organisms/MissionCardsCarousel";
import { ONBOARDING_MISSION, missions } from "~/features/missions";

export type ExploreMissionsHomeSectionProps = Omit<
  React.ComponentPropsWithRef<typeof HomeSectionWrapper>,
  "title" | "children"
>;

export const ExploreMissionsHomeSection: React.FC<
  ExploreMissionsHomeSectionProps
> = (props) => {
  const { ...wrapperProps } = props;

  const displayedMissions = useMemo(() => {
    // TODO: Improve the logic to select missions, maybe shuffling them, removing completed ones, etc.
    return missions.filter((mission) => mission.id !== ONBOARDING_MISSION.id);
  }, []);

  const i18n = useIntl();

  const title = i18n.formatMessage({
    id: "ExploreMissionsHomeSection.title",
    defaultMessage: "Explore Missions",
    description: "Title of the Explore Missions section on the home page",
  });

  const viewAllMissionsButtonLabel = i18n.formatMessage({
    id: "ExploreMissionsHomeSection.viewAllMissionsButtonLabel",
    defaultMessage: "View All",
    description: "Label of the button to view all missions",
  });

  return (
    <HomeSectionWrapper
      {...wrapperProps}
      title={title}
      headerLeft={
        <ButtonLink href="/missions" internal>
          {viewAllMissionsButtonLabel}
        </ButtonLink>
      }
    >
      <MissionCardsCarousel missions={displayedMissions} />
    </HomeSectionWrapper>
  );
};

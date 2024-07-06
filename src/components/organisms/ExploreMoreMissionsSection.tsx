import React, { useMemo } from "react";
import { useIntl } from "react-intl";

import { MissionCardsCarousel } from "~/components/organisms";
import { PageAsideSectionWrapper } from "~/components/templates";
import { Mission, missions } from "~/features/missions";

export type ExploreMoreMissionsSectionProps = {
  filterPredicate?: (mission: Mission) => boolean;
} & Omit<
  React.ComponentPropsWithRef<typeof PageAsideSectionWrapper>,
  "title" | "children"
>;

export const ExploreMoreMissionsSection: React.FC<
  ExploreMoreMissionsSectionProps
> = (props) => {
  const { filterPredicate = () => true, ...wrapperProps } = props;

  const displayedMissions = useMemo(() => {
    const filteredMissions = missions.filter(filterPredicate);
    // Shuffle the list
    return filteredMissions.sort(() => Math.random() - 0.5);
  }, [filterPredicate]);

  const i18n = useIntl();

  const sectionTitle = i18n.formatMessage({
    id: "ExploreMoreMissionsSection.sectionTitle",
    defaultMessage: "Explore More",
    description: "Title of mission page",
  });

  if (displayedMissions.length === 0) {
    return null;
  }

  return (
    <PageAsideSectionWrapper title={sectionTitle} {...wrapperProps}>
      <MissionCardsCarousel missions={displayedMissions} />
    </PageAsideSectionWrapper>
  );
};

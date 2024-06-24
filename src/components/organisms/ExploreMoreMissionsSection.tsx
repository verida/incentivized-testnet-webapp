import React, { useMemo } from "react";
import { useIntl } from "react-intl";

import { PageAsideSectionWrapper } from "~/components/molecules";
import { MissionCardsCaroussel } from "~/components/organisms";
import { Mission, missions } from "~/features/missions";

export type ExploreMoreMissionsSectionProps = {
  filterPredicate?: (mission: Mission) => boolean;
} & Omit<React.ComponentPropsWithRef<"aside">, "children">;

export const ExploreMoreMissionsSection: React.FC<
  ExploreMoreMissionsSectionProps
> = (props) => {
  const { filterPredicate = () => true, ...asideProps } = props;

  const displayedMissions = useMemo(() => {
    // TODO: Improve the logic to select missions, maybe shuffling them, removing completed ones, etc.
    return missions.filter(filterPredicate).slice(0, 3);
  }, [filterPredicate]);

  const i18n = useIntl();

  const sectionTitle = i18n.formatMessage({
    id: "ExploreMoreMissionsSection.sectionTitle",
    defaultMessage: "Explore More",
    description: "Title of mission page",
  });

  return (
    <aside {...asideProps}>
      <PageAsideSectionWrapper title={sectionTitle}>
        <MissionCardsCaroussel missions={displayedMissions} />
      </PageAsideSectionWrapper>
    </aside>
  );
};

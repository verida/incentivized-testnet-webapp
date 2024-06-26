import React from "react";
import { useIntl } from "react-intl";

import { Typography } from "~/components/atoms";
import { HomeOnboardingMissionCard } from "~/components/organisms";
import { Mission } from "~/features/missions";

export type HomeMissionBeginSectionProps = {
  mission: Mission;
} & React.ComponentPropsWithRef<"article">;

export const HomeMissionBeginSection: React.FC<HomeMissionBeginSectionProps> = (
  props
) => {
  const { mission } = props;

  const i18n = useIntl();

  const beginMissionLabel = i18n.formatMessage({
    id: "HomeMissionBeginSection.beginMissionLabel",
    defaultMessage: "Begin Your Journey",
    description: "Label for Home Onboarding Card",
  });

  return (
    <article>
      <Typography variant={"heading-m"} className="mb-6">
        {beginMissionLabel}
      </Typography>
      <HomeOnboardingMissionCard mission={mission} displayGoToMissionButton />
    </article>
  );
};

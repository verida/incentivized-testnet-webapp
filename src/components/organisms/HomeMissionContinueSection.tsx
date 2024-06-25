import React from "react";
import { useIntl } from "react-intl";

import { Typography } from "~/components/atoms";
import { HomeContinueMissionCard } from "~/components/organisms";
import { Mission } from "~/features/missions";

export type HomeMissionContinueSectionProps = {
  missions: Mission[];
} & React.ComponentPropsWithRef<"article">;

export const HomeMissionContinueSection: React.FC<
  HomeMissionContinueSectionProps
> = (props) => {
  const { missions } = props;

  const i18n = useIntl();

  const continueMissionLabel = i18n.formatMessage({
    id: "HomeMissionBeginSection.continueMissionLabel",
    defaultMessage: "Continue where you left of",
    description: "Label for Home Continue Mission Card",
  });

  return (
    <article>
      <Typography variant={"heading-m"} className="mb-6">
        {continueMissionLabel}
      </Typography>
      <div className="flex gap-4 lg:gap-8">
        <HomeContinueMissionCard mission={missions[1]} className="basis-1/2" />
        <HomeContinueMissionCard mission={missions[2]} className="basis-1/2" />
      </div>
    </article>
  );
};

import React from "react";
import { useIntl } from "react-intl";

import { Typography } from "~/components/atoms";
import { SideNavigationItem } from "~/components/molecules";
import { useActivity } from "~/features/activity";

export type SideNavigationProps = React.ComponentPropsWithRef<"div">;

export const SideNavigation: React.FunctionComponent<SideNavigationProps> = (
  props
) => {
  const { ...divProps } = props;

  const i18n = useIntl();
  const { missions } = useActivity();

  const sideNavigationTitle = i18n.formatMessage({
    id: "SideNavigation.sideNavigationTitle",
    description: "Title of the side navigation",
    defaultMessage: "Missions",
  });

  return (
    <div {...divProps}>
      <nav className="flex flex-col gap-3">
        <Typography variant="subtitle">{sideNavigationTitle}</Typography>
        {missions.map((mission, index) => (
          <SideNavigationItem
            key={mission.id}
            label={`${index + 1}. ${i18n.formatMessage(mission.title)}`}
            href={`#${mission.id}`}
          />
        ))}
      </nav>
    </div>
  );
};

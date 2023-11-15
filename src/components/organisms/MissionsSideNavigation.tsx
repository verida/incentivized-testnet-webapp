import React from "react";
import { useIntl } from "react-intl";

import { SideNavigation } from "~/components/molecules";
import { useActivity } from "~/features/activity";

export type MissionsSideNavigationProps = React.ComponentPropsWithRef<"div">;

export const MissionsSideNavigation: React.FunctionComponent<
  MissionsSideNavigationProps
> = (props) => {
  const { ...divProps } = props;

  const i18n = useIntl();
  const { missions } = useActivity();

  const navigationItems = missions.map((mission, index) => ({
    id: mission.id,
    label: `${index + 1}. ${i18n.formatMessage(mission.title)}`,
    href: `#${mission.id}`,
  }));

  const title = i18n.formatMessage({
    id: "MissionsSideNavigation.title",
    description: "Title of the side navigation",
    defaultMessage: "Missions",
  });

  return <SideNavigation {...divProps} title={title} items={navigationItems} />;
};

import React, { useMemo } from "react";
import { useIntl } from "react-intl";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { Typography } from "~/components/atoms";
import { PortalWrapper } from "~/components/molecules/PortalWrapper";
import { HeaderOffset } from "~/components/organisms";

type MenuItem = {
  label: string;
  url: string;
};

export type HeaderNavMenuProps = {
  open: boolean;
  onClose: () => void;
};

export const HeaderNavMenu: React.FC<HeaderNavMenuProps> = (props) => {
  const { open, onClose } = props;

  const i18n = useIntl();

  const missionsItemLabel = i18n.formatMessage({
    id: "HeaderNavMenu.missionsItemLabel",
    description: "Label for the Mission item in the navigation menu",
    defaultMessage: "Missions",
  });

  const airdropsItemLabel = i18n.formatMessage({
    id: "HeaderNavMenu.airdropsItemLabel",
    description: "Label for the Airdrops item in the navigation menu",
    defaultMessage: "Airdrops",
  });

  const menuItems: MenuItem[] = useMemo(() => {
    return [
      {
        label: missionsItemLabel,
        url: "/",
      },
      {
        label: airdropsItemLabel,
        url: "/airdrops",
      },
    ];
  }, [missionsItemLabel, airdropsItemLabel]);

  if (!open) {
    return null;
  }

  return (
    <PortalWrapper>
      <div className="fixed inset-0 z-50" onClick={onClose}>
        <HeaderOffset />
        <div className="h-full bg-background backdrop-blur-xl text-menu-foreground">
          <ul className="flex flex-col p-4">
            {menuItems.map((item) => (
              <li>
                <NavLink
                  to={item.url}
                  className={({ isActive }) =>
                    twMerge(
                      "block px-4 py-4 w-full rounded-lg hover:bg-transparent-15",
                      isActive ? "bg-transparent-5" : ""
                    )
                  }
                >
                  <Typography variant="base">{item.label}</Typography>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PortalWrapper>
  );
};

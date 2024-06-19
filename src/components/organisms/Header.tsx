import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { ReactComponent as VeridaNetworkLogoWithText } from "~/assets/images/verida_network_logo_with_text.svg";
import { Avatar, Icon, Typography } from "~/components/atoms";
import {
  HeaderIdentityMenu,
  HeaderNavMenu,
  XpPointsChip,
} from "~/components/molecules";
import { ConnectVeridaButton } from "~/components/organisms";
import { useActivity } from "~/features/activity";
import { useVerida } from "~/features/verida";

export type HeaderProps = Omit<
  React.ComponentPropsWithRef<"header">,
  "children"
>;

export const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const { ...headerProps } = props;

  const [openIdentityMenu, setOpenIdentityMenu] = useState(false);
  const [openNavMenu, setOpenNavMenu] = useState(false);
  const { isConnected, profile } = useVerida();
  const { userXpPoints, isLoadingUserActivities } = useActivity();

  const handleOpenIdentityMenu = useCallback(() => {
    setOpenIdentityMenu(true);
  }, []);

  const handleCloseIdentityMenu = useCallback(() => {
    setOpenIdentityMenu(false);
  }, []);

  const handleOpenNavMenu = useCallback(() => {
    setOpenNavMenu(true);
  }, []);

  const handleCloseNavMenu = useCallback(() => {
    setOpenNavMenu(false);
  }, []);

  const i18n = useIntl();

  const missionsNavLabel = i18n.formatMessage({
    id: "Header.missionsNavLabel",
    description: "Label for the Mission item in the navigation menu",
    defaultMessage: "Missions",
  });

  const airdropsNavLabel = i18n.formatMessage({
    id: "Header.airdropsNavLabel",
    description: "Label for the Airdrops item in the navigation menu",
    defaultMessage: "Airdrops",
  });

  return (
    <header {...headerProps}>
      <div
        className={twMerge(
          "flex flex-row justify-between border-b border-solid border-divider backdrop-blur-xl",
          openNavMenu ? "bg-background" : "bg-background/40"
        )}
      >
        <div className="flex flex-row gap-10">
          <div className="justify-self-start pl-0 pt-3 pb-[calc(0.75rem_-_1px)] flex flex-row items-center">
            <button
              onClick={handleOpenNavMenu}
              className="sm:hidden pl-4 pr-3 py-1"
            >
              <Icon type={openNavMenu ? "menu-close" : "menu-open"} size={24} />
            </button>
            <HeaderNavMenu open={openNavMenu} onClose={handleCloseNavMenu} />
            <div className="sm:pl-6 h-8 sm:h-10 aspect-[10/3]">
              <VeridaNetworkLogoWithText height="100%" width="100%" />
            </div>
          </div>
          <div className="hidden sm:flex flex-row gap-4">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                twMerge(
                  "px-4 pt-px flex items-center border-b",
                  isActive
                    ? "text-foreground border-transparent-95"
                    : "text-transparent-70 hover:text-foreground border-transparent"
                )
              }
            >
              <Typography>{missionsNavLabel}</Typography>
            </NavLink>
            <NavLink
              to={"/airdrops"}
              className={({ isActive }) =>
                twMerge(
                  "px-4 pt-px flex items-center border-b",
                  isActive
                    ? "text-foreground border-transparent-95"
                    : "text-transparent-70 hover:text-foreground border-transparent"
                )
              }
            >
              <Typography>{airdropsNavLabel}</Typography>
            </NavLink>
          </div>
        </div>
        <div className="justify-self-end pr-4 sm:pr-6 pt-3 pb-[calc(0.75rem_-_1px)] flex items-center gap-2 md:gap-4 justify-between">
          {isConnected ? (
            <>
              <XpPointsChip
                nbXpPoints={userXpPoints}
                isLoading={isLoadingUserActivities}
              />
              <button onClick={handleOpenIdentityMenu}>
                <Avatar
                  image={profile?.avatarUri}
                  alt={profile?.name}
                  className="h-10"
                />
              </button>
              <HeaderIdentityMenu
                open={openIdentityMenu}
                onClose={handleCloseIdentityMenu}
              />
            </>
          ) : (
            <ConnectVeridaButton />
          )}
        </div>
      </div>
    </header>
  );
};

/** Offset for the heigh of the Header */
export const HeaderOffset: React.FunctionComponent = () => {
  return <div className="h-16 w-full" />;
};

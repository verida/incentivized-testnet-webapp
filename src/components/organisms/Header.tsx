import React, { useCallback, useState } from "react";
import { twMerge } from "tailwind-merge";

import { ReactComponent as VeridaNetworkLogoWithText } from "~/assets/images/verida_network_logo_with_text.svg";
import { Avatar, Icon } from "~/components/atoms";
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

  return (
    <header {...headerProps}>
      <div
        className={twMerge(
          "flex flex-row justify-between border-b border-solid border-divider px-4 pl-0 pt-3 pb-[calc(0.75rem_-_1px)] backdrop-blur-xl sm:px-6",
          openNavMenu ? "bg-background" : "bg-background/40"
        )}
      >
        <div className="justify-self-start flex flex-row items-center justify-stretch">
          <button onClick={handleOpenNavMenu} className="pl-4 pr-3 py-1">
            <Icon type={openNavMenu ? "menu-close" : "menu-open"} size={24} />
          </button>
          <HeaderNavMenu open={openNavMenu} onClose={handleCloseNavMenu} />
          <div className="h-8 aspect-[10/3]">
            <VeridaNetworkLogoWithText height="100%" width="100%" />
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4 justify-between justify-self-end">
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

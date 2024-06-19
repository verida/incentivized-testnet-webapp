import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { twJoin } from "tailwind-merge";

import { ReactComponent as VeridaNetworkLogoWithText } from "~/assets/images/verida_network_logo_with_text.svg";
import { Avatar } from "~/components/atoms";
import { HeaderMenu, XpPointsChip } from "~/components/molecules";
import { ConnectVeridaButton } from "~/components/organisms";
import { useActivity } from "~/features/activity";
import { useVerida } from "~/features/verida";

export type HeaderProps = Omit<
  React.ComponentPropsWithRef<"header">,
  "children"
>;

export const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const { ...headerProps } = props;

  const i18n = useIntl();
  const [openMenu, setOpenMenu] = useState(false);
  const { isConnected, profile } = useVerida();
  const { userXpPoints, isLoadingUserActivities } = useActivity();

  const handleOpenMenu = useCallback(() => {
    setOpenMenu(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  const handleDisconnect = useCallback(() => {
    handleCloseMenu();
  }, [handleCloseMenu]);

  const homeLinkAriaLabel = i18n.formatMessage({
    id: "Header.homeLinkAriaLabel",
    description: "Aria label for the home link in the Header",
    defaultMessage: "Return to Home page",
  });

  const contentHeight = "h-10";

  return (
    <header {...headerProps}>
      <div className="flex flex-row justify-between border-b border-solid border-divider bg-background/40 px-4 pt-3 pb-[calc(0.75rem_-_1px)] backdrop-blur-xl sm:px-6">
        <div className="justify-self-start">
          <Link to="/" aria-label={homeLinkAriaLabel}>
            <div className={twJoin("aspect-[10/3]", contentHeight)}>
              <VeridaNetworkLogoWithText height="100%" width="100%" />
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-2 md:gap-4 justify-between justify-self-end">
          {isConnected ? (
            <>
              <XpPointsChip
                nbXpPoints={userXpPoints}
                isLoading={isLoadingUserActivities}
              />
              <button onClick={handleOpenMenu}>
                <Avatar
                  image={profile?.avatarUri}
                  alt={profile?.name}
                  className={contentHeight}
                />
              </button>
              <HeaderMenu
                open={openMenu}
                onClose={handleCloseMenu}
                onDisconnect={handleDisconnect}
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

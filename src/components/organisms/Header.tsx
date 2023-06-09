import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { ReactComponent as VeridaNetworkLogo } from "~/assets/images/verida_network_logo.svg";
import { ReactComponent as VeridaNetworkLogoWithText } from "~/assets/images/verida_network_logo_with_text.svg";
import { Button } from "~/components/atoms";
import type { MenuItem } from "~/components/molecules";
import { AvatarWithInfo, HeaderMenu } from "~/components/molecules";
import { config } from "~/config";
import { useActivity } from "~/features/activity";
import { useTermsConditions } from "~/features/termsconditions";
import { useVerida } from "~/features/verida";

type HeaderProps = React.ComponentPropsWithoutRef<"header">;

export const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const { ...headerProps } = props;

  const i18n = useIntl();
  const [openMenu, setOpenMenu] = useState(false);
  const { connect, disconnect, isConnected, profile, did } = useVerida();
  const { deleteTermsStatus } = useTermsConditions();
  const { deleteUserActivities } = useActivity();

  const handleOpenMenu = useCallback(() => {
    setOpenMenu(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  const handleConnect = useCallback(() => {
    void connect();
  }, [connect]);

  const handleDisconnect = useCallback(() => {
    handleCloseMenu();
    void disconnect();
  }, [handleCloseMenu, disconnect]);

  const homeLinkAriaLabel = i18n.formatMessage({
    id: "Header.homeLinkAriaLabel",
    description: "Aria label for the home link in the Header",
    defaultMessage: "Return to Home page",
  });

  const connectButtonLabel = i18n.formatMessage({
    id: "Header.connectButtonLabel",
    description: "Label of the Connect button in the Header",
    defaultMessage: "Connect",
  });

  const contentHeight = "h-10";

  const devModeMenuItems: MenuItem[] = config.devMode
    ? [
        {
          label: "Delete Terms",
          action: deleteTermsStatus,
        },
        {
          label: "Delete User Activities",
          action: deleteUserActivities,
        },
      ]
    : [];

  const menuItems: MenuItem[] = [
    {
      label: "Disconnect",
      action: handleDisconnect,
    },
    ...devModeMenuItems,
  ];

  return (
    <header {...headerProps}>
      <div className="flex flex-row justify-between border-b border-solid border-gray-dark bg-translucent px-4 pt-3 pb-[calc(0.75rem_-_1px)] backdrop-blur-[15px] sm:px-6">
        <div className="justify-self-start">
          <Link to="/" aria-label={homeLinkAriaLabel}>
            <div className={`aspect-[10/6.97] ${contentHeight} sm:hidden`}>
              <VeridaNetworkLogo height="100%" width="100%" />
            </div>
            <div className={`hidden aspect-[10/3] ${contentHeight} sm:block`}>
              <VeridaNetworkLogoWithText height="100%" width="100%" />
            </div>
          </Link>
        </div>
        <div className="flex items-center justify-between justify-self-end">
          {isConnected ? (
            <>
              <button
                className=" -mr-4 sm:-mr-6 text-start"
                onClick={handleOpenMenu}
              >
                <AvatarWithInfo
                  did={did}
                  image={profile?.avatarUri}
                  name={profile?.name}
                  className={`${contentHeight} max-w-[220px]`}
                />
              </button>
              <HeaderMenu
                open={openMenu}
                onClose={handleCloseMenu}
                items={menuItems}
              />
            </>
          ) : (
            <Button onClick={handleConnect} size="medium">
              {connectButtonLabel}
            </Button>
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

import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { twJoin, twMerge } from "tailwind-merge";

import { ReactComponent as VeridaNetworkLogoWithText } from "~/assets/images/verida_network_logo_with_text.svg";
import { Avatar, Typography } from "~/components/atoms";
import type { MenuItem } from "~/components/molecules";
import { HeaderMenu } from "~/components/molecules";
import { ConnectVeridaButton } from "~/components/organisms/ConnectVeridaButton";
import { config } from "~/config";
import { useActivity } from "~/features/activity";
import { useTermsConditions } from "~/features/termsconditions";
import { truncateDid, useVerida } from "~/features/verida";

type HeaderProps = React.ComponentPropsWithoutRef<"header">;

export const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const { ...headerProps } = props;

  const i18n = useIntl();
  const [openMenu, setOpenMenu] = useState(false);
  const { disconnect, isConnected, profile, did } = useVerida();
  const { deleteTermsStatus } = useTermsConditions();
  const { deleteUserActivities } = useActivity();

  const handleOpenMenu = useCallback(() => {
    setOpenMenu(true);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  const handleDisconnect = useCallback(() => {
    handleCloseMenu();
    void disconnect();
  }, [handleCloseMenu, disconnect]);

  const homeLinkAriaLabel = i18n.formatMessage({
    id: "Header.homeLinkAriaLabel",
    description: "Aria label for the home link in the Header",
    defaultMessage: "Return to Home page",
  });

  const profileNameFallback = i18n.formatMessage({
    id: "Header.profileNameFallback",
    description: "Fallback name for the profile name in the Header",
    defaultMessage: "'<Anon>'",
  });

  const contentHeight = "h-10";

  const devModeMenuItems: MenuItem[] = config.devMode
    ? [
        {
          key: "delete-terms",
          label: "Delete Terms",
          action: deleteTermsStatus,
        },
        {
          key: "delete-user-activities",
          label: "Delete User Activities",
          action: deleteUserActivities,
        },
      ]
    : [];

  const menuItems: MenuItem[] = [
    {
      key: "profile-info",
      label: (
        <div className="flex flex-col justify-between flex-shrink truncate">
          <Typography
            className={twMerge(
              "truncate font-semibold",
              profile?.name === undefined ? "italic" : undefined
            )}
          >
            {profile?.name || profileNameFallback}
          </Typography>
          {did === undefined ? null : (
            <>
              <Typography className="truncate text-sm leading-3.5 text-foreground/50">
                {truncateDid(did, 7, 4)}
              </Typography>
            </>
          )}
        </div>
      ),
      disabled: true,
    },
    {
      key: "disconnect",
      label: "Disconnect",
      action: handleDisconnect,
    },
    ...devModeMenuItems,
  ];

  return (
    <header {...headerProps}>
      <div className="flex flex-row justify-between border-b border-solid border-divider bg-translucent px-4 pt-3 pb-[calc(0.75rem_-_1px)] backdrop-blur-[15px] sm:px-6">
        <div className="justify-self-start">
          <Link to="/" aria-label={homeLinkAriaLabel}>
            <div className={twJoin("aspect-[10/3]", contentHeight)}>
              <VeridaNetworkLogoWithText height="100%" width="100%" />
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-2 justify-between justify-self-end">
          {isConnected ? (
            <>
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
                items={menuItems}
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

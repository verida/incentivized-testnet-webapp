import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { twJoin, twMerge } from "tailwind-merge";

import { ReactComponent as VeridaNetworkLogoWithText } from "~/assets/images/verida_network_logo_with_text.svg";
import { Avatar, Chip, Icon, Typography } from "~/components/atoms";
import type { MenuItem } from "~/components/molecules";
import { HeaderMenu } from "~/components/molecules";
import { ConnectVeridaButton } from "~/components/organisms";
import { config } from "~/config";
import { useActivity } from "~/features/activity";
import { useTermsConditions } from "~/features/termsconditions";
import { truncateDid, useVerida } from "~/features/verida";

export type HeaderProps = React.ComponentPropsWithRef<"header">;

export const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const { ...headerProps } = props;

  const i18n = useIntl();
  const [openMenu, setOpenMenu] = useState(false);
  const { disconnect, isConnected, profile, did } = useVerida();
  const { deleteTermsStatus } = useTermsConditions();
  const { deleteUserActivities, userXpPoints, isLoadingUserActivities } =
    useActivity();

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

  const xpPointsChipLabel = i18n.formatMessage(
    {
      id: "Header.xpPointsChipLabel",
      description: "Display of the user total XP points",
      defaultMessage: "{points} XP",
    },
    { points: userXpPoints }
  );

  const disconnectButtonLabel = i18n.formatMessage({
    id: "Header.disconnectButtonLabel",
    description: "Label for the disconnect button in the Header",
    defaultMessage: "Disconnect",
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
        <div className="p-2 flex flex-col gap-0.5 justify-between flex-shrink truncate border-b border-solid border-divider">
          <Typography
            variant="subtitle"
            className={twMerge(
              "truncate",
              profile?.name === undefined ? "italic" : undefined
            )}
          >
            <span className="text-foreground">
              {/* TODO: Investigate class conflict preventing setting 'text-foreground' on Typography */}
              {profile?.name || profileNameFallback}
            </span>
          </Typography>
          {did === undefined ? null : (
            <>
              <Typography variant="base-s" className="truncate">
                <span className="text-muted-foreground">
                  {/* TODO: Investigate class conflict preventing setting 'text-foreground' on Typography */}
                  {truncateDid(did, 7, 4)}
                </span>
              </Typography>
            </>
          )}
        </div>
      ),
      disabled: true,
      replaceButton: true,
    },
    {
      key: "disconnect",
      label: (
        <div className="flex flex-row gap-2 items-center">
          <Icon type="disconnect" size={20} />
          {disconnectButtonLabel}
        </div>
      ),
      action: handleDisconnect,
    },
    ...devModeMenuItems,
  ];

  return (
    <header {...headerProps}>
      <div className="flex flex-row justify-between border-b border-solid border-divider bg-translucent px-4 pt-3 pb-[calc(0.75rem_-_1px)] backdrop-blur-[5px] sm:px-6">
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
              <Chip variant="primary">
                {isLoadingUserActivities ? (
                  // FIXME: Icon doesn't spin
                  <Icon
                    size={16}
                    type="loading"
                    className="animate-spin-slow"
                  />
                ) : (
                  xpPointsChipLabel
                )}
              </Chip>
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

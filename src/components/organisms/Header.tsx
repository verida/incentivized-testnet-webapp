import React, { useCallback, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { twJoin, twMerge } from "tailwind-merge";

import { ReactComponent as VeridaNetworkLogoWithText } from "~/assets/images/verida_network_logo_with_text.svg";
import { Avatar, Icon, Typography } from "~/components/atoms";
import type { MenuItem } from "~/components/molecules";
import { HeaderMenu, XpPointsChip } from "~/components/molecules";
import { ConnectVeridaButton } from "~/components/organisms";
import { config } from "~/config";
import { useActivity } from "~/features/activity";
import { useAirdrop1, useAirdrop2 } from "~/features/airdrops";
import { truncateDid, useVerida } from "~/features/verida";

export type HeaderProps = Omit<
  React.ComponentPropsWithRef<"header">,
  "children"
>;

export const Header: React.FunctionComponent<HeaderProps> = (props) => {
  const { ...headerProps } = props;

  const i18n = useIntl();
  const [openMenu, setOpenMenu] = useState(false);
  const { disconnect, isConnected, profile, did } = useVerida();
  const { deleteUserActivities, userXpPoints, isLoadingUserActivities } =
    useActivity();

  const {
    metadata: airdrop1Metadata,
    isEnabled: isAirdrop1Enabled,
    openModal: openAirdrop1Modal,
  } = useAirdrop1();
  const {
    metadata: airdrop2Metadata,
    openModal: openAirdrop2Modal,
    isEnabled: isAirdrop2Enabled,
  } = useAirdrop2();

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

  const handleAirdrop1Click = useCallback(() => {
    openAirdrop1Modal();
  }, [openAirdrop1Modal]);

  const handleAirdrop2Click = useCallback(() => {
    openAirdrop2Modal();
  }, [openAirdrop2Modal]);

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

  const airdrop1ButtonLabel = i18n.formatMessage(airdrop1Metadata.shortTitle);

  const airdrop2ButtonLabel = i18n.formatMessage(airdrop2Metadata.shortTitle);

  const disconnectButtonLabel = i18n.formatMessage({
    id: "Header.disconnectButtonLabel",
    description: "Label for the disconnect button in the Header",
    defaultMessage: "Disconnect",
  });

  const contentHeight = "h-10";

  const airdropsMenuItems: MenuItem[] = [];

  if (isAirdrop1Enabled) {
    airdropsMenuItems.push({
      key: "airdrop1",
      label: (
        <div className="flex flex-row gap-2 items-center">
          <Icon type="wallet" size={20} />
          {airdrop1ButtonLabel}
        </div>
      ),
      action: handleAirdrop1Click,
    });
  }

  if (isAirdrop2Enabled) {
    airdropsMenuItems.push({
      key: "airdrop2",
      label: (
        <div className="flex flex-row gap-2 items-center">
          <Icon type="wallet" size={20} />
          {airdrop2ButtonLabel}
        </div>
      ),
      action: handleAirdrop2Click,
    });
  }

  const devModeMenuItems: MenuItem[] = config.devMode
    ? [
        {
          key: "delete-user-activities",
          label: "[DEV] Delete User Activities",
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
    ...airdropsMenuItems,
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

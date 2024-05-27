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
import { useAirdrop1, useAirdrop2 } from "~/features/airdrops";
import { truncateDid, useVerida } from "~/features/verida";

export type HeaderProps = React.ComponentPropsWithRef<"header">;

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

  const vdaLinkAriaLabel = i18n.formatMessage({
    id: "Header.vdaLinkAriaLabel",
    description: "Aria label for the VDA link in the Header",
    defaultMessage: "https://www.verida.network/vda-token",
  });

  const vdaLinkLabel = i18n.formatMessage({
    id: "Header.vdaLinkLabel",
    description: "Label for the VDA link in the Header",
    defaultMessage:
      "The Verida Storage Credit Token (VDA) is now live. Learn more",
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
      <Link
        to={"https://www.verida.network/vda-token"}
        area-label={vdaLinkAriaLabel}
        target="_blank"
        className="bg-[#4F1D74] w-full p-4 flex gap-2 items-center justify-center hover:underline underline-offset-1"
      >
        {vdaLinkLabel}
        <Icon type="arrow-right" size={20} />
      </Link>
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

import React, { useCallback, useMemo } from "react";
import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { Icon, Typography } from "~/components/atoms";
import { PortalWrapper } from "~/components/molecules/PortalWrapper";
import { config } from "~/config";
import { useActivity } from "~/features/activity";
import { useAirdrop1, useAirdrop2 } from "~/features/airdrops";
import { truncateDid, useVerida } from "~/features/verida";

export type MenuItem = {
  key: string;
  label: React.ReactNode;
  action?: () => void;
  className?: string;
  disabled?: boolean;
  replaceButton?: boolean;
};

export type HeaderMenuProps = {
  open: boolean;
  onClose: () => void;
  onDisconnect: () => void;
};

export const HeaderMenu: React.FunctionComponent<HeaderMenuProps> = (props) => {
  const { open, onClose, onDisconnect } = props;

  const i18n = useIntl();
  const { profile, did, disconnect } = useVerida();
  const { deleteUserActivities } = useActivity();

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

  const handleDisconnect = useCallback(() => {
    void disconnect();
    onDisconnect();
  }, [onDisconnect, disconnect]);

  const handleAirdrop1Click = useCallback(() => {
    openAirdrop1Modal();
  }, [openAirdrop1Modal]);

  const handleAirdrop2Click = useCallback(() => {
    openAirdrop2Modal();
  }, [openAirdrop2Modal]);

  const profileNameFallback = i18n.formatMessage({
    id: "Header.profileNameFallback",
    description: "Fallback name for the profile name in the Header",
    defaultMessage: "'<Anon>'",
  });

  const disconnectButtonLabel = i18n.formatMessage({
    id: "Header.disconnectButtonLabel",
    description: "Label for the disconnect button in the Header",
    defaultMessage: "Disconnect",
  });

  const airdrop1ButtonLabel = i18n.formatMessage(airdrop1Metadata.shortTitle);

  const airdrop2ButtonLabel = i18n.formatMessage(airdrop2Metadata.shortTitle);

  const items: MenuItem[] = useMemo(() => {
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

    return menuItems;
  }, [
    airdrop1ButtonLabel,
    airdrop2ButtonLabel,
    did,
    disconnectButtonLabel,
    handleAirdrop1Click,
    handleAirdrop2Click,
    handleDisconnect,
    isAirdrop1Enabled,
    isAirdrop2Enabled,
    profile,
    profileNameFallback,
    deleteUserActivities,
  ]);

  if (!open) {
    return null;
  }

  return (
    <PortalWrapper>
      <div className="fixed inset-0 z-50" onClick={onClose}></div>
      <div className="fixed top-14 right-4 z-50 bg-menu text-menu-foreground rounded-xl border border-solid border-divider shadow-xl backdrop-blur-[10px]">
        <ul className="flex flex-col p-2 gap-2 rounded-lg">
          {items.map((item) => (
            <li key={item.key}>
              {item.replaceButton ? (
                <>{item.label}</>
              ) : (
                <button
                  className={twMerge(
                    "hover:bg-transparent-20 w-full py-2.5 px-2 rounded-lg disabled:text-muted-foreground disabled:bg-transparent text-left text-sm font-semibold",
                    item.className
                  )}
                  onClick={() => {
                    if (!item.action) return;
                    item.action();
                    onClose();
                  }}
                  disabled={item.disabled}
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </PortalWrapper>
  );
};

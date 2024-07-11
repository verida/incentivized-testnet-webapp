import React, { useCallback, useMemo } from "react";
import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { Icon, Typography } from "~/components/atoms";
import { PortalWrapper } from "~/components/molecules/PortalWrapper";
import { config } from "~/config";
import { useActivity } from "~/features/activity";
import { truncateDid, useVerida } from "~/features/verida";
import { useWalletConnect } from "~/features/walletconnect";

type MenuItem = {
  key: string;
  label: React.ReactNode;
  action?: () => void;
  className?: string;
  disabled?: boolean;
  replaceButton?: boolean;
};

export type HeaderIdentityMenuProps = {
  open: boolean;
  onClose: () => void;
};

export const HeaderIdentityMenu: React.FunctionComponent<
  HeaderIdentityMenuProps
> = (props) => {
  const { open, onClose } = props;

  const i18n = useIntl();
  const { profile, did, disconnect: disconnectVerida } = useVerida();
  const { disconnect: disconnectWalletConnect } = useWalletConnect();
  const { deleteUserActivities } = useActivity();

  const handleDisconnect = useCallback(() => {
    void disconnectVerida();
    void disconnectWalletConnect();
    onClose();
  }, [onClose, disconnectVerida, disconnectWalletConnect]);

  const profileNameFallback = i18n.formatMessage({
    id: "HeaderIdentityMenu.profileNameFallback",
    description: "Fallback name for the profile name in the Header",
    defaultMessage: "'<Anon>'",
  });

  const disconnectButtonLabel = i18n.formatMessage({
    id: "HeaderIdentityMenu.disconnectButtonLabel",
    description: "Label for the disconnect button in the Header",
    defaultMessage: "Disconnect",
  });

  const items: MenuItem[] = useMemo(() => {
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
    did,
    disconnectButtonLabel,
    handleDisconnect,
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

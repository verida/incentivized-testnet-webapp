import React from "react";
import { twMerge } from "tailwind-merge";

import { PortalWrapper } from "~/components/molecules/PortalWrapper";

export type MenuItem = {
  key: string;
  label: React.ReactNode;
  action?: () => void;
  className?: string;
  disabled?: boolean;
  replaceButton?: boolean;
};

type HeaderMenuProps = {
  open: boolean;
  items: MenuItem[];
  onClose: () => void;
};

export const HeaderMenu: React.FunctionComponent<HeaderMenuProps> = (props) => {
  const { open, items, onClose } = props;

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

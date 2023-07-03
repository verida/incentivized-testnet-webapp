import React from "react";

import { PortalWrapper } from "~/components/molecules/PortalWrapper";

export type MenuItem = {
  label: string;
  action: () => void;
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
      <div className="fixed top-14 right-1 z-50 bg-background rounded-lg shadow-lg">
        <ul className="py-2 bg-transparent-15 rounded-lg">
          {items.map((item) => (
            <li key={item.label}>
              <button
                className="hover:bg-transparent-20 w-full p-2.5"
                onClick={() => {
                  item.action();
                  onClose();
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </PortalWrapper>
  );
};

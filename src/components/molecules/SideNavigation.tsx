import React from "react";

import {
  SideNavigationItem,
  SideNavigationItemProps,
  Typography,
} from "~/components/atoms";

export type SideNavigationProps = {
  title?: string;
  items: SideNavigationItemProps[];
} & React.ComponentPropsWithRef<"div">;

export const SideNavigation: React.FunctionComponent<SideNavigationProps> = (
  props
) => {
  const { title, items, ...divProps } = props;

  return (
    <div {...divProps}>
      <nav className="flex flex-col gap-3">
        {title ? <Typography variant="subtitle">{title}</Typography> : null}
        {items.map((item) => (
          <SideNavigationItem {...item} />
        ))}
      </nav>
    </div>
  );
};

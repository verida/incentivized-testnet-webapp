import React from "react";

import { Typography } from "~/components/atoms";

export type SideNavigationItemProps = {
  active?: boolean;
  href: string;
  label: string;
};

export const SideNavigationItem: React.FunctionComponent<
  SideNavigationItemProps
> = (props) => {
  const { active, href, label } = props;

  return (
    <a href={href} className="opacity-80 hover:opacity-100">
      <Typography
        variant="base-s"
        className={active ? "text-primary" : "text-foreground"}
      >
        {label}
      </Typography>
    </a>
  );
};

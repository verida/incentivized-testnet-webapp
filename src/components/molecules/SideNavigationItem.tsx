import React from "react";

import { Typography } from "~/components/atoms";

export type SideNavigationItemProps = {
  label: string;
  href: string;
};

export const SideNavigationItem: React.FunctionComponent<
  SideNavigationItemProps
> = (props) => {
  const { label, href } = props;

  return (
    <a href={href} className="">
      <Typography
        variant="base-s"
        className="text-muted-foreground hover:text-foreground"
      >
        {label}
      </Typography>
    </a>
  );
};

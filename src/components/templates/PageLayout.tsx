import React from "react";

import { Typography } from "~/components/atoms";
import { APP_TITLE } from "~/constants";

export type PageLayoutProps = {
  title: string;
  children: React.ReactNode;
} & React.ComponentPropsWithRef<"div">;

export const PageLayout: React.FunctionComponent<PageLayoutProps> = (props) => {
  const { title, children, className, ...divProps } = props;

  return (
    <div {...divProps}>
      <div className="flex flex-grow flex-col items-center justify-center text-center mt-24">
        <Typography
          variant="base"
          className="leading-[120%] font-semibold text-primary uppercase tracking-[0.07rem] sm:tracking-[0.08rem]"
        >
          {APP_TITLE}
        </Typography>
        <Typography variant="heading-l" className="mt-3">
          {/* Had to surround by div because of style conflict with Typography, likely 'text-transparent' */}
          <div className="bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 px-8 sm:px-14">
            {title}
          </div>
        </Typography>
      </div>
      {children}
    </div>
  );
};

import React from "react";

import { Typography } from "~/components/atoms";
import { BackButton } from "~/components/molecules";
import { APP_TITLE } from "~/constants";

export type PageLayoutProps = {
  title?: string;
  children: React.ReactNode;
  showBackButton?: boolean;
  hideAppTitle?: boolean;
} & React.ComponentPropsWithRef<"div">;

export const PageLayout: React.FunctionComponent<PageLayoutProps> = (props) => {
  const {
    title,
    children,
    className,
    showBackButton,
    hideAppTitle,
    ...divProps
  } = props;

  return (
    <div {...divProps} className={className}>
      <div className="flex flex-grow flex-col items-center justify-center text-center w-full">
        {!hideAppTitle && (
          <Typography
            variant="base"
            className="leading-[120%] font-semibold text-primary uppercase tracking-[0.07rem] sm:tracking-[0.08rem]"
          >
            {APP_TITLE}
          </Typography>
        )}
      </div>
      <div className="flex gap-2 flex-col md:flex-row relative mt-2 lg:mt-12">
        {showBackButton && <BackButton />}
        <div className="flex flex-col w-full">
          {title && (
            <Typography variant="heading-l" className="mx-auto">
              {/* Had to surround by div because of style conflict with Typography, likely 'text-transparent' */}
              <div className="bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 px-8 sm:px-14 text-center">
                {title}
              </div>
            </Typography>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

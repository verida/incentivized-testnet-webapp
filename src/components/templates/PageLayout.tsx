import React from "react";
import { useNavigate } from "react-router-dom";

import { Icon, Typography } from "~/components/atoms";
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

  const navigate = useNavigate();

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
      <div className="flex gap-2 flex-col md:flex-row">
        {showBackButton && (
          <Icon
            type="arrow-left"
            size={20}
            className="p-2 bg-backButtonBackground rounded-lg border-2 border-white/20 font-bold cursor-pointer hover:bg-backButtonBackground/50 w-10 h-10"
            onClick={() => navigate(-1)}
          />
        )}
        <div className="flex flex-col w-full">
          {title && (
            <Typography variant="heading-l" className="mx-auto">
              {/* Had to surround by div because of style conflict with Typography, likely 'text-transparent' */}
              <div className="bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 px-8 sm:px-14">
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

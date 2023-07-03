import React from "react";
import { Balancer } from "react-wrap-balancer";

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
        <p className="text-sm sm:text-base font-semibold text-primary uppercase">
          {APP_TITLE}
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold mt-3 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
          <Balancer>{title}</Balancer>
        </h1>
      </div>
      {children}
    </div>
  );
};

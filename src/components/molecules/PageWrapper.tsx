import React from "react";

import { APP_TITLE } from "~/constants";

type PageWrapperProps = {
  title: string;
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"div">;

export const PageWrapper: React.FunctionComponent<PageWrapperProps> = (
  props
) => {
  const { title, children, ...divProps } = props;

  return (
    <div {...divProps}>
      <div className="flex flex-grow flex-col items-center justify-center text-center mt-24">
        <h2 className="text-sm sm:text-base font-bold text-purple uppercase">
          {APP_TITLE}
        </h2>
        <h3 className="text-4xl sm:text-5xl font-bold mt-3 bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary/70">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
};

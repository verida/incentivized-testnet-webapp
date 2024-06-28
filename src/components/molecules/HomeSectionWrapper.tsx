import React from "react";

import { Typography } from "~/components/atoms";

export type HomeSectionWrapperProps = {
  title: string;
  headerLeft?: React.ReactNode;
} & React.ComponentPropsWithRef<"div">;

export const HomeSectionWrapper: React.FC<HomeSectionWrapperProps> = (
  props
) => {
  const { title, children, headerLeft, ...divProps } = props;

  return (
    <section {...divProps}>
      <div className="flex flex-col gap-6">
        <header className="px-6 flex flex-row justify-between items-center">
          <Typography variant="heading-m">{title}</Typography>
          {headerLeft}
        </header>
        <div>{children}</div>
      </div>
    </section>
  );
};

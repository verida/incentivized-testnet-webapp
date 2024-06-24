import React from "react";

import { Typography } from "~/components/atoms";

export type PageAsideSectionWrapperProps = {
  title: string;
} & React.ComponentPropsWithRef<"aside">;

export const PageAsideSectionWrapper: React.FC<PageAsideSectionWrapperProps> = (
  props
) => {
  const { title, children, ...asideProps } = props;

  return (
    <aside {...asideProps}>
      <div className="flex flex-col gap-6 sm:gap-10">
        <div className="self-start sm:self-center w-fit px-4 sm:px-6">
          <Typography variant="heading-m">{title}</Typography>
        </div>
        <div>{children}</div>
      </div>
    </aside>
  );
};

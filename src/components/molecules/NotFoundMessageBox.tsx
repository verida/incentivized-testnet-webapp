import React from "react";
import { twMerge } from "tailwind-merge";

import { Typography } from "~/components/atoms";

export type NotFoundMessageBoxProps = {
  logo?: React.ReactNode;
  title: string;
  description: string;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const NotFoundMessageBox: React.FC<NotFoundMessageBoxProps> = (
  props
) => {
  const { logo, title, description, className, ...divProps } = props;

  return (
    <div
      className={twMerge(
        "flex flex-col items-center gap-4 max-w-screen-sm text-center",
        className
      )}
      {...divProps}
    >
      {logo ? (
        <div className="flex flex-row items-center w-50 h-50 sm:w-60 sm:h-60">
          {logo}
        </div>
      ) : null}
      <Typography variant="heading-m">{title}</Typography>
      <Typography>{description}</Typography>
    </div>
  );
};

import React from "react";
import { twMerge } from "tailwind-merge";

import { Chip } from "~/components/atoms";

type MissionIdLabelChipProps = {
  label: string;
} & Omit<React.ComponentPropsWithoutRef<"div">, "children">;

export const MissionIdLabelChip: React.FunctionComponent<
  MissionIdLabelChipProps
> = (props) => {
  const { label, className, ...divProps } = props;

  return (
    <Chip
      {...divProps}
      color="default"
      className={twMerge(
        "bg-background border-border text-muted-foreground",
        className
      )}
    >
      {label}
    </Chip>
  );
};

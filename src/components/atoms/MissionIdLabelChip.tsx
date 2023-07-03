import React from "react";

import { Chip } from "~/components/atoms";

type MissionIdLabelChipProps = {
  label: string;
} & Omit<React.ComponentPropsWithoutRef<"div">, "children">;

export const MissionIdLabelChip: React.FunctionComponent<
  MissionIdLabelChipProps
> = (props) => {
  const { label, className, ...divProps } = props;

  return (
    <Chip {...divProps} variant="muted" className="bg-background">
      {label}
    </Chip>
  );
};

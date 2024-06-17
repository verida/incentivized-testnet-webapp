import React from "react";

import { Variants } from "~/components/atoms";
import { MissionProgressBar } from "~/components/molecules";
import { UserActivityStatus } from "~/features/activity";

export type MissionBottomBarProps = {
  isLoading?: boolean;
  statuses: UserActivityStatus[];
  variant?: Variants;
  points?: number;
} & React.ComponentPropsWithRef<"div">;

export const MissionBottomBar: React.FC<MissionBottomBarProps> = (props) => {
  const { points, statuses, isLoading, ...divProps } = props;

  return (
    <div {...divProps}>
      <div className="p-4 lg:px-6 lg:py-4 rounded-xl lg:rounded-2xl backdrop-blur-xl border border-border bg-clip-border bg-gradient-to-r from-primary/25 to-primary/10">
        <MissionProgressBar
          variant="base"
          className="gap-3 lg:gap-6 flex flex-col w-full"
          isLoading={isLoading}
          statuses={statuses}
          point={points}
          showPoint={true}
          showLabel={true}
        />
      </div>
    </div>
  );
};

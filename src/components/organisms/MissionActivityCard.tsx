import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { Icon, Typography } from "~/components/atoms";
import { XpPointsChip } from "~/components/molecules";
import { Activity, useActivity } from "~/features/activity";

export type MissionActivityCardProps = {
  activityIndex: number;
  activity: Activity;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

// TODO: Rename to ActivityListItem or something like this. Also it is not a card, not everything is a card!
export const MissionActivityCard: React.FC<MissionActivityCardProps> = (
  props
) => {
  const { activityIndex, activity, ...divProps } = props;

  const { getUserActivity } = useActivity();
  const userActivity = getUserActivity(activity.id);

  const i18n = useIntl();

  return (
    <div {...divProps}>
      <div className=" px-4 py-5 lg:p-6 rounded-xl border border-white/20 bg-transparent-6 hover:border-white/40 hover:bg-transparent-10 flex flex-col gap-4">
        <div className="flex items-center gap-3 lg:gap-4">
          <div
            className={twMerge(
              "rounded-full w-8 h-8 lg:w-10 lg:h-10 flex justify-center items-center text-desktop-base-s font-semibold",
              userActivity?.status === "completed"
                ? "bg-success"
                : userActivity?.status === "pending"
                  ? "bg-white text-background"
                  : "bg-white/20"
            )}
          >
            {userActivity?.status === "completed" ? (
              <Icon type="check" size={20} />
            ) : (
              activityIndex
            )}
          </div>
          <Typography
            variant="heading-s"
            className="flex-1 text-nowrap overflow-ellipsis overflow-hidden"
          >
            {i18n.formatMessage(activity.title)}
          </Typography>
          <div className="hidden lg:block">
            <XpPointsChip nbXpPoints={activity.points} />
          </div>
          <Icon type="chevron-right" size={20} />
        </div>
        <div className="lg:hidden">
          <div className="flex flex-row gap-3 lg:gap-4 justify-start">
            <XpPointsChip nbXpPoints={activity.points} />
          </div>
        </div>
      </div>
    </div>
  );
};

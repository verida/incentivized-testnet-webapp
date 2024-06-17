import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { Icon, Typography } from "~/components/atoms";
import { EndedChip, PendingChip, XpPointsChip } from "~/components/molecules";
import { Activity, useActivity } from "~/features/activity";

export type ActivityListItemProps = {
  activityIndex: number;
  activity: Activity;
  showPartners?: boolean;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const ActivityListItem: React.FC<ActivityListItemProps> = (props) => {
  const { activityIndex, activity, showPartners, ...divProps } = props;

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
              activity.ended
                ? "bg-ended-background"
                : userActivity?.status === "completed"
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
            className={twMerge(
              "flex-1 text-nowrap overflow-ellipsis overflow-hidden",
              activity.ended ? "text-white/30" : "text-foreground"
            )}
          >
            {i18n.formatMessage(activity.title)}
          </Typography>
          {activity.ended && <EndedChip className="hidden lg:flex" />}
          {!activity.ended && (
            <>
              <div className="hidden lg:flex gap-4">
                {userActivity?.status === "pending" && <PendingChip />}
                <XpPointsChip nbXpPoints={activity.points} />
              </div>
              {userActivity?.status !== "completed" && (
                <Icon type="chevron-right" size={20} />
              )}
            </>
          )}
        </div>
        <div className="lg:hidden">
          {activity.ended && <EndedChip />}
          {!activity.ended && (
            <div className="flex flex-row gap-3 lg:gap-4 justify-start">
              {userActivity?.status === "pending" && <PendingChip />}
              <XpPointsChip nbXpPoints={activity.points} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

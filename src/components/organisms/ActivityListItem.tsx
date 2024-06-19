import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { ActivityIndex, Icon, Typography } from "~/components/atoms";
import { ActivityStatus, XpPointsChip } from "~/components/molecules";
import { Activity, useActivity } from "~/features/activity";
import { useVerida } from "~/features/verida";

export type ActivityListItemProps = {
  activityIndex: number;
  activity: Activity;
  showPartners?: boolean;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const ActivityListItem: React.FC<ActivityListItemProps> = (props) => {
  const { activityIndex, activity, showPartners, ...divProps } = props;

  const { isConnected } = useVerida();
  const { getUserActivity, isLoadingUserActivities } = useActivity();
  const userActivity = getUserActivity(activity.id);
  const status = userActivity?.status || "todo";

  const i18n = useIntl();

  return (
    <div {...divProps}>
      <div
        className={twMerge(
          " px-4 py-5 lg:p-6 rounded-xl border border-transparent sm:border-border hover:border-border-hover hover:bg-transparent-10 flex flex-col gap-6",
          activity.ended ? "bg-transparent-3" : "bg-transparent-6"
        )}
      >
        <div className="flex flex-row items-center justify-start gap-3 lg:gap-4">
          <ActivityIndex
            index={String(activityIndex)}
            status={
              isLoadingUserActivities
                ? "checking"
                : activity.ended
                  ? "ended"
                  : userActivity?.status
            }
            className="h-8 lg:h-10"
          />
          <Typography
            variant="heading-s"
            className={twMerge(
              "flex-1 overflow-ellipsis overflow-hidden line-clamp-2",
              activity.ended ? "text-transparent-70" : "text-foreground"
            )}
          >
            {i18n.formatMessage(activity.title)}
          </Typography>
          <div className="flex flex-row items-center gap-4">
            {activity.enabled ? (
              <>
                <div className="hidden lg:flex flex-row items-center gap-4">
                  {isConnected &&
                  (isLoadingUserActivities || status !== "todo") ? (
                    <>
                      <ActivityStatus
                        status={isLoadingUserActivities ? "checking" : status}
                      />
                      <XpPointsChip nbXpPoints={activity.points} />
                    </>
                  ) : activity.ended ? (
                    <ActivityStatus status="ended" />
                  ) : (
                    <XpPointsChip nbXpPoints={activity.points} />
                  )}
                </div>
                <Icon type="chevron-right" size={20} />
              </>
            ) : (
              <ActivityStatus status="disabled" />
            )}
          </div>
        </div>
        <div className="lg:hidden flex flex-row gap-3">
          {activity.enabled ? (
            <>
              {isConnected && (isLoadingUserActivities || status !== "todo") ? (
                <>
                  <XpPointsChip nbXpPoints={activity.points} />
                  <ActivityStatus
                    status={isLoadingUserActivities ? "checking" : status}
                  />
                </>
              ) : activity.ended ? (
                <ActivityStatus status="ended" />
              ) : (
                <XpPointsChip nbXpPoints={activity.points} />
              )}
            </>
          ) : (
            <ActivityStatus status="disabled" />
          )}
        </div>
      </div>
    </div>
  );
};

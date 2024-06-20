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
  hideXpPoints?: boolean;
  small?: boolean;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const ActivityListItem: React.FC<ActivityListItemProps> = (props) => {
  const {
    activityIndex,
    activity,
    showPartners,
    hideXpPoints = false,
    small = false,
    ...divProps
  } = props;

  const { isConnected } = useVerida();
  const { getUserActivity, isLoadingUserActivities } = useActivity();
  const userActivity = getUserActivity(activity.id);
  const status = userActivity?.status || "todo";

  const i18n = useIntl();

  return (
    <div {...divProps}>
      <div
        className={twMerge(
          "rounded-xl border border-transparent sm:border-border hover:border-border-hover hover:bg-transparent-10 flex flex-col gap-6",
          activity.ended ? "bg-transparent-3" : "bg-transparent-6",
          small ? "px-4 py-3" : "px-4 py-5 lg:p-6"
        )}
      >
        <div
          className={twMerge(
            "flex flex-row items-center justify-start gap-3 lg:gap-4",
            small ? "h-8" : ""
          )}
        >
          <ActivityIndex
            index={String(activityIndex)}
            status={
              isLoadingUserActivities
                ? "checking"
                : activity.ended
                  ? "ended"
                  : userActivity?.status
            }
            className={small ? "h-6" : "h-8 lg:h-10"}
          />
          <div className="grow">
            <Typography
              variant={small ? "heading-xs" : "heading-s"}
              className={twMerge(
                "flex-1 overflow-ellipsis overflow-hidden line-clamp-2",
                activity.ended ? "text-transparent-70" : "text-foreground"
              )}
            >
              {i18n.formatMessage(activity.title)}
            </Typography>
          </div>
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
                      {!hideXpPoints ? (
                        <XpPointsChip nbXpPoints={activity.points} />
                      ) : null}
                    </>
                  ) : activity.ended ? (
                    <ActivityStatus status="ended" />
                  ) : !hideXpPoints ? (
                    <XpPointsChip nbXpPoints={activity.points} />
                  ) : null}
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
                  {!hideXpPoints ? (
                    <XpPointsChip nbXpPoints={activity.points} />
                  ) : null}
                  <ActivityStatus
                    status={isLoadingUserActivities ? "checking" : status}
                  />
                </>
              ) : activity.ended ? (
                <ActivityStatus status="ended" />
              ) : !hideXpPoints ? (
                <XpPointsChip nbXpPoints={activity.points} />
              ) : null}
            </>
          ) : (
            <ActivityStatus status="disabled" />
          )}
        </div>
      </div>
    </div>
  );
};

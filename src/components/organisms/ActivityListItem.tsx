import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { ActivityIndex, Icon, Typography } from "~/components/atoms";
import { ActivityStatus, XpPointsChip } from "~/components/molecules";
import { Activity, useActivity } from "~/features/activity";
import { useVerida } from "~/features/verida";

export type ActivityListItemProps = {
  activityIndex: number;
  activity: Activity;
  hidePartners?: boolean;
  hideXpPoints?: boolean;
  size?: "default" | "small";
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const ActivityListItem: React.FC<ActivityListItemProps> = (props) => {
  const {
    activityIndex,
    activity,
    hidePartners, // TODO: Handle the hidePartners prop
    hideXpPoints = false,
    size = "default",
    ...divProps
  } = props;

  const { isConnected, isConnecting } = useVerida();
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
          size === "small" ? "px-4 py-3" : "px-4 py-5 lg:p-6"
        )}
      >
        <div
          className={twMerge(
            "flex flex-row items-center justify-start",
            size === "small" ? "gap-3" : "gap-3 lg:gap-4"
          )}
        >
          <ActivityIndex
            index={String(activityIndex)}
            status={
              isConnecting || (isConnected && isLoadingUserActivities)
                ? "checking"
                : activity.ended
                  ? "ended"
                  : userActivity?.status
            }
          />
          <Typography
            variant={size === "small" ? "heading-xs" : "heading-s"}
            className={twMerge(
              "flex-1",
              activity.ended ? "text-transparent-70" : "text-foreground",
              size === "small" ? "line-clamp-1" : "line-clamp-2"
            )}
          >
            {i18n.formatMessage(activity.title)}
          </Typography>
          <div
            className={twMerge(
              "flex flex-row items-center",
              size === "small" ? "gap-3" : "gap-4"
            )}
          >
            {activity.enabled ? (
              <>
                {isConnected &&
                (isLoadingUserActivities || status !== "todo") ? (
                  <div
                    className={twMerge(
                      "hidden lg:flex flex-row items-center",
                      size === "small" ? "gap-3" : "gap-4"
                    )}
                  >
                    <ActivityStatus
                      status={isLoadingUserActivities ? "checking" : status}
                    />
                    {!hideXpPoints ? (
                      <XpPointsChip nbXpPoints={activity.points} />
                    ) : null}
                  </div>
                ) : activity.ended ? (
                  <div
                    className={twMerge(
                      "hidden lg:flex flex-row items-center",
                      size === "small" ? "gap-3" : "gap-4"
                    )}
                  >
                    <ActivityStatus status="ended" />
                  </div>
                ) : !hideXpPoints ? (
                  <div
                    className={twMerge(
                      "hidden lg:flex flex-row items-center",
                      size === "small" ? "gap-3" : "gap-4"
                    )}
                  >
                    <XpPointsChip nbXpPoints={activity.points} />
                  </div>
                ) : null}
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

import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { Icon, Typography } from "~/components/atoms";
import { PointCard } from "~/components/molecules";
import { StackedImage } from "~/components/molecules";
import { Activity, useActivity } from "~/features/activity";
import { partners as wholePartners } from "~/features/partners";

export type MissionActivityCardProps = {
  activityIndex: number;
  activity: Activity;
  showPartners?: boolean;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

// TODO: Rename ActivityListItem or something like this. Also it is not a card, not everything is a card!
export const MissionActivityCard: React.FC<MissionActivityCardProps> = (
  props
) => {
  const { activityIndex, activity, showPartners, ...divProps } = props;

  const { getUserActivity } = useActivity();
  const userActivity = getUserActivity(activity.id);

  const i18n = useIntl();
  const activitypartners = wholePartners.filter((partner) =>
    activity.partners?.find((item) => partner.id === item)
  );
  const navigate = useNavigate();

  return (
    <div {...divProps}>
      <div
        className="flex flex-col lg:flex-row px-4 py-5 lg:p-6 rounded-xl border border-white/20 bg-transparent-6 hover:border-white/40 hover:bg-transparent-10 items-center cursor-pointer gap-4"
        onClick={() => navigate(`/activities/${activity.id}`)}
      >
        <div className="flex items-center gap-3 lg:gap-4 w-full">
          <div
            className={twMerge(
              "rounded-full w-8 h-8 lg:w-10 lg:h-10 flex justify-center items-center text-desktop-base-s font-semibold",
              userActivity?.status === "completed"
                ? "bg-success"
                : userActivity?.status === "pending"
                  ? "bg-white text-partnerMissionInfoButtonColor"
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
            component={"h5"}
            className="!text-heading-s flex-1 text-nowrap overflow-ellipsis overflow-hidden"
          >
            {i18n.formatMessage(activity.title)}
          </Typography>
          <div className="hidden lg:flex">
            <PointCard points={activity.points} />
          </div>
          {showPartners && (
            <div className="hidden lg:flex">
              <StackedImage
                images={activitypartners.map((partner) => partner.image || "")}
              />
            </div>
          )}

          <Icon type="chevron-right" size={20} />
        </div>
        <div className="flex lg:hidden gap-3 lg:gap-4 w-full justify-start">
          <PointCard points={activity.points} />
          {showPartners && (
            <StackedImage
              images={activitypartners.map((partner) => partner.image || "")}
            />
          )}
        </div>
      </div>
    </div>
  );
};

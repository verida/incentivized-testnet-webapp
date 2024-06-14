import { useMemo } from "react";
import { useIntl } from "react-intl";

import { Typography } from "~/components/atoms";
import {
  MissionProgressBar,
  StackedImage,
  XpPointsBadge,
  XpPointsChip,
} from "~/components/molecules";
import { Mission, useActivity } from "~/features/activity";
import { activities } from "~/features/activity/activities";
import { Partner, partners as wholePartners } from "~/features/partners";

export type MissionInfoCardProps = {
  mission: Mission;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const MissionInfoCard: React.FC<MissionInfoCardProps> = (props) => {
  const { mission, ...divProps } = props;
  const i18n = useIntl();

  const missionLabel = i18n.formatMessage(mission.title);

  const { isLoadingUserActivities, getUserActivity } = useActivity();

  const missionActivities = activities.filter(
    (activity) =>
      activity.enabled && activity.visible && activity.missionId === mission.id
  );
  const activityStatuses = useMemo(() => {
    return missionActivities.map((activity) => {
      const userActivity = getUserActivity(activity.id);
      return userActivity?.status ?? "todo";
    });
  }, [missionActivities, getUserActivity]);

  const progressLabel = i18n.formatMessage({
    id: "MissionInfoCard.progresslabel",
    description: "progress label",
    defaultMessage: `${activityStatuses.filter((status) => status === "completed")?.length} / ${activityStatuses.length}`,
  });

  const totalPoints = missionActivities?.reduce((acc, cur) => {
    return acc + cur.points;
  }, 0);

  const partnerIds = missionActivities
    .reduce<string[]>((acc, cur) => {
      if (cur.partners) {
        return acc.concat(cur.partners);
      } else {
        return acc;
      }
    }, [])
    .reduce<string[]>((acc, cur) => {
      if (!acc.includes(cur)) {
        acc.push(cur);
      }
      return acc;
    }, []);

  const partners = partnerIds.reduce((acc: Partner[], partnerId) => {
    const partner = wholePartners.find((item) => item.id === partnerId);
    if (partner) {
      acc.push(partner);
    }
    return acc;
  }, []);

  return (
    <div {...divProps}>
      <div className="border border-white/30 backdrop-blur-4xl overflow-hidden rounded-xl w-full h-full">
        <div className="relative rounded-xl flex flex-col overflow-hidden backdrop-blur-4xl h-full">
          <div className="bg-mission-card w-full h-full absolute -z-10"></div>
          <div className="p-4">
            <XpPointsBadge nbXpPoints={totalPoints} className="m-auto" />
            <div className="w-full">
              <Typography
                component={"span"}
                className="!text-base-s !font-semibold"
              >
                {progressLabel}
              </Typography>
              <div className="flex gap-1">
                <MissionProgressBar
                  className="gap-3 lg:gap-6 flex flex-col w-full"
                  isLoading={isLoadingUserActivities}
                  statuses={activityStatuses}
                  showPoint={false}
                  showLabel={false}
                />
              </div>
            </div>
          </div>

          <div className="rounded-tl-xl rounded-tr-xl overflow-hidden bg-missionBottom flex-1 px-4 py-6 flex flex-col w-full gap-6">
            <h3 className="text-desktop-base lg:text-mission-title line-clamp-2">
              {missionLabel}
            </h3>
            <div className="flex justify-between items-center mt-auto">
              <XpPointsChip nbXpPoints={totalPoints} />
              <StackedImage
                images={partners.map((partner) => partner.logo || "")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

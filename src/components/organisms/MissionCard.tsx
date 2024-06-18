import { useMemo } from "react";
import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import {
  MissionCardActivitiesProgressBar,
  StackedImage,
  XpPointsBadge,
  XpPointsChip,
} from "~/components/molecules";
import { useActivity } from "~/features/activity";
import { activities } from "~/features/activity/activities";
import {
  Mission,
  isOnboardingMission as isOnboardingMissionFunc,
} from "~/features/missions";
import { Partner, partners as wholePartners } from "~/features/partners";

export type MissionCardProps = {
  mission: Mission;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const MissionCard: React.FC<MissionCardProps> = (props) => {
  const { mission, ...divProps } = props;

  const isOnboardingMission = isOnboardingMissionFunc(mission.id);

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

  const i18n = useIntl();

  const missionLabel = i18n.formatMessage(mission.title);

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
          <div
            className={twMerge(
              "bg-mission-default w-full h-full absolute -z-10",
              isOnboardingMission
                ? "bg-mission-onboarding"
                : "bg-mission-default"
            )}
          ></div>
          <div className="p-4">
            <XpPointsBadge
              nbXpPoints={totalPoints}
              theme={isOnboardingMission ? "onboarding" : "default"}
              className="m-auto"
            />
            <MissionCardActivitiesProgressBar
              isLoading={isLoadingUserActivities}
              activityStatuses={activityStatuses}
            />
          </div>

          <div className="rounded-tl-xl rounded-tr-xl overflow-hidden bg-background/90 flex-1 px-4 py-6 flex flex-col w-full gap-6">
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

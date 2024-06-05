import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { ReactComponent as BgPoint } from "~/assets/images/bg_point.svg";
import { MissionProgessBarIndicator } from "~/components/atoms/MissionProgessBarIndicator";
import {
  Partner,
  PartnerMission,
  UserActivityStatus,
} from "~/features/activity";
import { activities } from "~/features/activity/activities";
import { partners as wholePartners } from "~/features/activity/partners";

export function PartnerMissionCard({ mission }: { mission: PartnerMission }) {
  const i18n = useIntl();

  const xpText = i18n.formatMessage({
    id: "partnermission.xplabel",
    description: "Description of xp label",
    defaultMessage: "XP",
  });

  const altText = i18n.formatMessage({
    id: "partnermission.alt",
    description: "Description of image",
    defaultMessage: "point-alt",
  });

  // dummy
  const activityStatus: UserActivityStatus[] = [
    "completed",
    "todo",
    "todo",
    "todo",
    "todo",
  ];

  const progressLabel = i18n.formatMessage({
    id: "partnermission.progresslabel",
    description: "Description of progress label",
    defaultMessage: `${activityStatus.filter((status) => status === "completed")?.length} / ${activityStatus.length}`,
  });

  const missionLabel = i18n.formatMessage(mission.title);

  const missionActivities = activities.filter(
    (activity) =>
      activity.enabled && activity.visible && activity.missionId === mission.id
  );

  const totalPoints = missionActivities?.reduce((acc, cur) => {
    return acc + cur.points;
  }, 0);

  const partners = mission.partners.reduce((acc: Partner[], partnerId) => {
    const partner = wholePartners.find((item) => item.id === partnerId);
    if (partner) {
      acc.push(partner);
    }
    return acc;
  }, []);

  return (
    <div className="bg-partnerMissionCardBg border border-white/30 backdrop-blur-4xl shadow-partner-mission overflow-hidden rounded-xl max-w-partner-info-card">
      <div className="relative rounded-xl flex flex-col overflow-hidden backdrop-blur-4xl">
        <div className="bg-partner-mission-overlay w-full h-full absolute -z-10"></div>
        <div className="p-4">
          <div className="relative flex justify-center">
            <BgPoint />
            <span className="absolute top-[45%] justify-center flex w-full font-bold text-point-title">
              {totalPoints} {xpText}
            </span>
          </div>
          <div className="w-full">
            <span className="text-base-s font-semibold">{progressLabel}</span>
            <div className="flex gap-1">
              {activityStatus.map((status, index) => (
                <MissionProgessBarIndicator
                  key={index}
                  variant={status}
                  className="flex-grow"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-tl-xl rounded-tr-xl overflow-hidden bg-partnerMissionContentBg flex-1 px-4 py-6 flex flex-col w-full gap-6">
          <h3 className="text-desktop-base md:text-mission-title">
            {missionLabel}
          </h3>
          <div className="flex justify-between items-center">
            <div className="flex rounded-[53px] py-1.5 px-3 gap-1.5 border border-border-component items-center">
              <img
                src="/images/point-star.png"
                alt={altText}
                className="w-5 h-5"
              />
              <span className="flex text-base font-semibold">
                {totalPoints} {xpText}
              </span>
            </div>
            <div className="flex">
              {partners.map((partner) => (
                <img
                  src={partner.image}
                  alt={altText}
                  className={twMerge(
                    "rounded-full w-8 h-8 bg-white p-1",
                    partners.length > 1 ? "-ml-3" : "ml-0"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

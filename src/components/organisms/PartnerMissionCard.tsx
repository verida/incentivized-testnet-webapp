import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

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
  const alt = "bg_point";

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
    <div className="max-w-[384px] rounded-[12px] flex flex-col h-[400px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-[18px] relative flex justify-center mt-5 mb-1 h-[150px]">
        <img src="/images/bg_point.png" className="w-[160px] h-" alt={alt} />
        <span className="absolute top-[45%] justify-center flex w-full pl-[2px] font-bold">
          {totalPoints} {xpText}
        </span>
      </div>
      <div className="w-full px-[16px]">
        <span className="text-[12px]">{progressLabel}</span>
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
      <div className="rounded-tl-md rounded-tr-md bg-[#19193D]/70 flex-1 px-[16px] py-[24px] mt-[16px] flex flex-col w-full">
        <h3 className="text-[16px] md:text-[20px] font-bold leading-6">
          {missionLabel}
        </h3>
        <div className="flex justify-between items-center space-x-2  mt-auto">
          <div className="rounded-3xl py-[6px] px-[12px] flex gap-2 border-[1px] border-border-component items-center">
            <img
              src="/images/point-star.png"
              alt=""
              className="w-[18px] h-[20px]"
            />
            <span className="flex text-[14px]">
              {totalPoints} {xpText}
            </span>
          </div>
          <div className="flex">
            {partners.map((partner) => (
              <img
                src={partner.image}
                alt=""
                className={twMerge(
                  "rounded-full w-[32px] h-[32px]",
                  partners.length > 1 ? "ml-[-10px]" : "ml-0"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

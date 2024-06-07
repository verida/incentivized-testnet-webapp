import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { Icon } from "~/components/atoms";
import { Activity, useActivity } from "~/features/activity";

export function PartnerMissionInfoActivityRow({
  no,
  activity,
}: {
  no: number;
  activity: Activity;
}) {
  const { getUserActivity } = useActivity();
  const userActivity = getUserActivity(activity.id);
  const i18n = useIntl();
  const altText = i18n.formatMessage({
    id: "partner.mission.info.activity.alt",
    defaultMessage: "alt-star",
    description: "Alt message of image",
  });
  const xpText = i18n.formatMessage({
    id: "partner.mission.info.activity.xp",
    defaultMessage: `${activity.points} XP`,
    description: "Description message of XP",
  });
  const timeRemainingText = i18n.formatMessage({
    id: "partner.mission.info.activity.time",
    defaultMessage: `${activity.points} left`,
    description: "Description message of time",
  });

  return (
    <div className="flex flex-col lg:flex-row px-4 py-5 lg:p-6 rounded-xl border border-white/20 bg-transparent-6 hover:border-white/40 hover:bg-transparent-10 items-center cursor-pointer gap-4">
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
            no
          )}
        </div>
        <h5 className="text-heading-s flex-1 text-nowrap overflow-ellipsis overflow-hidden">
          {i18n.formatMessage(activity.title)}
        </h5>
        <div className="hidden h-fit rounded-badge py-1.5 px-3 gap-2 border border-white/20 bg-white/10 items-center">
          <img src="/images/ic_clock.png" alt={altText} className="w-5 h-5" />
          <span className="flex text-base font-semibold text-nowrap">
            {timeRemainingText}
          </span>
        </div>
        <div className="hidden lg:flex h-fit rounded-badge py-1.5 px-3 gap-2 border border-border-component bg-pointBg items-center">
          <img src="/images/point-star.png" alt={altText} className="w-5 h-5" />
          <span className="flex text-base font-semibold text-nowrap">
            {xpText}
          </span>
        </div>
        <Icon type="chevron-right" size={20} />
      </div>
      <div className="flex lg:hidden gap-3 lg:gap-4 w-full justify-start">
        <div className="rounded-badge h-fit py-1.5 px-3 gap-2 border border-white/20 bg-white/10 items-center hidden">
          <img src="/images/ic_clock.png" alt={altText} className="w-5 h-5" />
          <span className="flex text-base font-semibold text-nowrap">
            {timeRemainingText}
          </span>
        </div>
        <div className="flex rounded-badge h-fit py-1.5 px-3 gap-2 border border-border-component bg-pointBg items-center">
          <img src="/images/point-star.png" alt={altText} className="w-5 h-5" />
          <span className="flex text-base font-semibold text-nowrap">
            {xpText}
          </span>
        </div>
      </div>
    </div>
  );
}

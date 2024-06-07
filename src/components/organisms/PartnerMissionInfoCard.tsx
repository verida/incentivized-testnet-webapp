import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

import { Button } from "~/components/atoms";
import { Activity, Partner, PartnerMission } from "~/features/activity";

import { PartnerMissionInfoActivityRow } from "./PartnerMissionInfoActivityRow";

export const PartnerMissionInfoCard = ({
  partner,
  mission,
  activities,
}: {
  partner: Partner;
  mission: PartnerMission;
  activities: Activity[];
}) => {
  const navigate = useNavigate();

  const i18n = useIntl();
  const startMissionText = i18n.formatMessage({
    id: "partner.mission.info.mission_text",
    description: "Description of partner mission text",
    defaultMessage: "Start Mission",
  });
  const activityText = i18n.formatMessage({
    id: "partner.mission.info.activity_text",
    description: "Description of partner mission activity text",
    defaultMessage: "Complete all activities below",
  });
  return (
    <div className="border border-white/50 bg-partnerMissionCardBg backdrop-blur-4xl rounded-2xl w-full overflow-hidden">
      <div className="bg-partner-mission-overlay w-full h-full absolute -z-10 rounded-2xl"></div>
      <div className="flex flex-col py-6 px-4 lg:p-6 gap-6">
        <h4 className="text-desktop-heading-m leading-[140%]">
          {i18n.formatMessage(mission.title)}
        </h4>
        <Button
          className="py-2.5 px-8 bg-white rounded-xl text-desktop-base-s font-semibold text-partnerMissionInfoButtonColor w-fit hover:bg-white/90"
          onClick={() => navigate(`/missions/${mission.id}`)}
        >
          {startMissionText}
        </Button>
      </div>
      <div className="flex flex-col py-6 px-4 lg:py-8 lg:px-6 gap-6 rounded-2xl bg-partnerMissionInfoContentBg w-full backdrop-blur-[30px]">
        <h5 className="text-desktop-base font-semibold">{activityText}</h5>
        <div className="flex flex-col w-full gap-6">
          {activities.map((activity, index) => (
            <PartnerMissionInfoActivityRow
              activity={activity}
              no={index + 1}
              key={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

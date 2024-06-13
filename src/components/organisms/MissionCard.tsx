import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

import { Button, Typography } from "~/components/atoms";
import { XPCard } from "~/components/molecules";
import { Activity, Mission } from "~/features/activity";

import { MissionActivityCard } from "./MissionActivityCard";
import { MissionActivityComingSoonCard } from "./MissionActivityComingSoonCard";

export type MissionCardProps = {
  mission: Mission;
  activities: Activity[];
  showDetails?: boolean;
  showPoints?: boolean;
  showStartButton?: boolean;
  showPartners?: boolean;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const MissionCard: React.FC<MissionCardProps> = (props) => {
  const {
    mission,
    activities,
    showDetails,
    showPoints,
    showStartButton,
    showPartners,
    ...divProps
  } = props;

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
    <div {...divProps}>
      <div className="border border-white/50 bg-partnerMissionCardBg backdrop-blur-4xl rounded-2xl w-full overflow-hidden">
        <div className="bg-partner-mission-overlay w-full h-full absolute -z-10"></div>
        <div className="flex py-6 px-4 lg:p-6 gap-6 items-center">
          <div className="flex gap-6 flex-1 flex-col">
            <Typography
              component={"h4"}
              className="!text-mobile-heading lg:!text-desktop-heading-m lg:!leading-[140%]"
            >
              {i18n.formatMessage(mission.title)}
            </Typography>
            {showDetails && (
              <Typography component={"span"} className="!text-desktop-base">
                {i18n.formatMessage(mission.shortDescription, {
                  newline: <></>,
                })}
              </Typography>
            )}
            {showStartButton && (
              <Button
                className="py-2.5 px-8 bg-white rounded-xl text-desktop-base-s font-semibold text-partnerMissionInfoButtonColor w-fit hover:bg-white/90"
                onClick={() => navigate(`/missions/${mission.id}`)}
              >
                {startMissionText}
              </Button>
            )}
          </div>
          {showPoints && (
            <div className="hidden lg:flex">
              <XPCard point={100} classNames="h-full" />
            </div>
          )}
        </div>
        <div className="flex flex-col py-6 px-4 lg:py-8 lg:px-6 gap-6 rounded-2xl bg-partnerMissionInfoContentBg w-full backdrop-blur-[30px]">
          <Typography
            component={"span"}
            className="!text-desktop-base !font-semibold"
          >
            {activityText}
          </Typography>
          <div className="flex flex-col w-full gap-6">
            {activities.map((activity, index) => (
              <MissionActivityCard
                activity={activity}
                activityIndex={index + 1}
                key={index}
                showPartners={showPartners}
              />
            ))}
            <MissionActivityComingSoonCard no={activities.length + 1} />
          </div>
        </div>
      </div>
    </div>
  );
};

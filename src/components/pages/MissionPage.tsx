import { useMemo } from "react";
import { useIntl } from "react-intl";
import { useNavigate, useParams } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Typography } from "~/components/atoms";
import { MissionProgressBar } from "~/components/molecules";
import { MissionCard, MissionInfoCard } from "~/components/organisms";
import { PageLayout } from "~/components/templates";
import {
  isOnboardingMission as isOnboardingMissionFunc,
  missions,
  useActivity,
} from "~/features/activity";

export const MissionPage: React.FC = () => {
  const i18n = useIntl();

  const emptry = i18n.formatMessage({
    id: "MissionPage.emptyMessage",
    description: "Message when mission doesn't exist",
    defaultMessage: "No data",
  });

  // Extract mission id from url path
  const { missionId = "" } = useParams();

  // Check if current mission is onboarding mission
  const mission = missions.find((item) => item.id === missionId);
  const isOnboardingMission = isOnboardingMissionFunc(missionId);

  const navigate = useNavigate();

  const {
    activities: allActivities,
    isLoadingUserActivities,
    getUserActivity,
  } = useActivity();

  const missionActivities = allActivities.filter(
    (activity) => activity.missionId === mission?.id && activity.visible
  );

  const activityStatuses = useMemo(() => {
    return missionActivities.map((activity) => {
      const userActivity = getUserActivity(activity.id);
      return userActivity?.status ?? "todo";
    });
  }, [missionActivities, getUserActivity]);

  const point = missionActivities.reduce((acc, cur) => acc + cur.points, 0);

  const title = i18n.formatMessage({
    id: "MissionPage.title",
    defaultMessage: "Explore More",
    description: "Title of mission page",
  });

  return (
    <PageLayout hideReportIssueButton>
      {mission ? (
        <div className="flex flex-col w-full max-w-mission-page mx-auto">
          <div className="w-full justify-center max-w-mission mx-auto">
            <MissionCard
              activities={missionActivities}
              mission={mission}
              showDescription={true}
              hideButtonLink={true}
              showPoints={true}
              showPartners={true}
            />
          </div>
          <div className="sticky bottom-6 left-0 right-0 max-w-mission-page-progress mx-auto w-full mt-11 p-4 lg:px-6 lg:py-4 rounded-2xl backdrop-blur-xl border-border-progress border bg-progressBg">
            <MissionProgressBar
              variant="base"
              className="gap-3 lg:gap-6 flex flex-col w-full"
              isLoading={isLoadingUserActivities}
              statuses={activityStatuses}
              point={point}
              showPoint={true}
              showLabel={true}
            />
          </div>
          {!isOnboardingMission && (
            <>
              {/* TODO: Create a dedicated component for the caroussel */}
              <div className="flex flex-col mt-28 w-full overflow-hidden justify-center items-center gap-10">
                <Typography variant="heading-m">{title}</Typography>
                <Swiper
                  className="relative !z-0 w-full flex gap-2 bg-transparent md:hidden"
                  modules={[Navigation]}
                  slidesPerView={1}
                  spaceBetween={32}
                >
                  {missions.map((mission) => (
                    <SwiperSlide
                      key={mission.id}
                      className="flex bg-transparent w-fit justify-center"
                      onClick={() => navigate(`/missions/${mission.id}`)}
                      // TODO: Prefer use of a <Link>
                    >
                      <MissionInfoCard mission={mission} />
                    </SwiperSlide>
                  ))}
                </Swiper>
                {/* Desktop view */}
                <div className="gap-4 justify-between w-full items-stretch hidden md:grid grid-cols-3">
                  {missions.slice(0, 3).map((mission) => (
                    <div
                      key={mission.id}
                      className="flex-1 h-full"
                      onClick={() => navigate(`/missions/${mission.id}`)}
                      // TODO: Prefer use of a <Link>
                    >
                      <MissionInfoCard mission={mission} className="h-full" />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          {/* TODO: Rework the not found state */}
          <div className="">{emptry}</div>
        </>
      )}
    </PageLayout>
  );
};

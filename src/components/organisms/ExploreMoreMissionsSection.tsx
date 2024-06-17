import React from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { Typography } from "~/components/atoms";
import { MissionCard } from "~/components/organisms";
import { missions } from "~/features/missions";

export type ExploreMoreMissionsSectionProps = Omit<
  React.ComponentPropsWithRef<"aside">,
  "children"
>;

export const ExploreMoreMissionsSection: React.FC<
  ExploreMoreMissionsSectionProps
> = (props) => {
  const { ...asideProps } = props;

  const i18n = useIntl();

  const sectionTitle = i18n.formatMessage({
    id: "ExploreMoreMissionsSection.sectionTitle",
    defaultMessage: "Explore More",
    description: "Title of mission page",
  });

  return (
    <aside {...asideProps}>
      <div className="flex flex-col overflow-hidden justify-center items-center gap-10">
        <Typography variant="heading-m">{sectionTitle}</Typography>
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
            >
              <Link to={`/missions/${mission.id}`}>
                <MissionCard mission={mission} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Desktop view */}
        <div className="gap-4 justify-between w-full items-stretch hidden md:grid grid-cols-3">
          {missions.slice(0, 3).map((mission) => (
            <div key={mission.id} className="flex-1 h-full">
              <Link to={`/missions/${mission.id}`}>
                <MissionCard mission={mission} className="h-full" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

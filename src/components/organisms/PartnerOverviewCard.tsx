import React from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { Icon } from "~/components/atoms";
import {
  Activity,
  Partner,
  PartnerMission,
  SocialType,
} from "~/features/activity/types";

export const PartnerOverviewCard = ({
  partner,
  activities,
  missions,
}: {
  partner: Partner;
  activities: Activity[];
  missions: PartnerMission[];
}) => {
  const i18n = useIntl();

  const badgeText = i18n.formatMessage({
    id: "partners.badge",
    description: "Description of partner badge",
    defaultMessage: "Partner",
  });
  const missionText = i18n.formatMessage({
    id: "missions.title",
    description: "Description of missions title",
    defaultMessage: "Mission",
  });
  return (
    <div className="w-full md:w-[384px] h-fit bg-transparent-3 relative">
      <div className="absolute bottom-[calc(100%_-_5px)] left-0 bg-[#733BD6] text-white text-[12px] font-semibold px-3 py-1 rounded-tr-lg rounded-tl-lg border-[1px] border-[#733BD6] z-[0]">
        {badgeText}
      </div>
      <div className="bg-[#220F41] p-6 rounded-[12px] relative border-[#733BD6] border-[1px] z-[1]">
        <div className="flex items-center mb-4 ">
          <img
            src={partner.image || "/images/partners/default.png"}
            alt={partner.id}
            className="w-16 h-16 rounded-full"
          />
          <div className="ml-auto bg-white/10 hover: text-white px-3 py-1 rounded-lg text-center">
            <span className="block text-[16px] font-bold">
              {missions.length}
            </span>
            <span className="block text-[12px">{missionText}</span>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <h3 className="text-white text-[20px] md: font-bold">
            {i18n.formatMessage(partner.title)}
          </h3>
          <span className="text-white text-[14px]">
            {i18n.formatMessage(partner.shortDescription)}
          </span>
        </div>
        <div className="flex gap-3 flex-wrap mt-4">
          {partner.resources?.map((resource, index) => (
            <Link
              to={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 items-center text-purple-400 hover:text-white transition text-[12px]"
              key={index}
            >
              <Icon type="external-link" size={16} />
              {i18n.formatMessage(resource.label)}
            </Link>
          ))}
        </div>
        <div className="flex justify-between items-center gap-1 text-purple-400 mt-5">
          {partner.socials?.map((social, index) => (
            <Link
              to={social.link}
              className="rounded-full p-[10px] bg-white/15 hover:bg-white/30"
              key={index}
            >
              {social.type === SocialType.DISCORD && (
                <Icon type="platform-discord" size={12} />
              )}
              {social.type === SocialType.LINKEDIN && (
                <Icon type="platform-linkedin" size={12} />
              )}
              {social.type === SocialType.MEDIUM && (
                <Icon type="platform-medium" size={12} />
              )}
              {social.type === SocialType.TELEGRAM && (
                <Icon type="platform-telegram" size={12} />
              )}
              {social.type === SocialType.X && (
                <Icon type="platform-x" size={12} />
              )}
              {social.type === SocialType.YOUTUBE && (
                <Icon type="platform-youtube" size={12} />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

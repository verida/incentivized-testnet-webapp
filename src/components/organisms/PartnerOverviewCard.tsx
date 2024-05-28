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
    <div className="min-w-[384px] max-w-[500px] h-fit bg-transparent-3 relative">
      <div className="absolute bottom-[calc(100%_-_5px)] left-0 bg-[#733BD6] text-white text-sm font-semibold px-3 py-1 rounded-tr-lg rounded-tl-lg border-[1px] border-[#733BD6] z-[0]">
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
            <span className="block text-lg font-bold">{missions.length}</span>
            <span className="block text-sm">{missionText}</span>
          </div>
        </div>
        <div className="flex flex-col w-full gap-1">
          <h3 className="text-white text-2xl font-bold">
            {i18n.formatMessage(partner.title)}
          </h3>
          <span className="text-white">
            {i18n.formatMessage(partner.shortDescription)}
          </span>
        </div>
        <div className="flex gap-3 flex-wrap mt-3">
          {partner.resources?.map((resource, index) => (
            <Link
              to={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 items-center text-purple-400 hover:text-white transition"
              key={index}
            >
              <Icon type="external-link" size={16} />
              {i18n.formatMessage(resource.label)}
            </Link>
          ))}
        </div>
        <div className="flex justify-between items-center gap-1 text-purple-400 mt-4">
          {partner.socials?.map((social, index) => (
            <Link
              to={social.link}
              className="rounded-full p-2 bg-white/15 hover:bg-white/30"
              key={index}
            >
              {social.type === SocialType.DISCORD && (
                <Icon type="platform-discord" />
              )}
              {social.type === SocialType.LINKEDIN && (
                <Icon type="platform-linkedin" />
              )}
              {social.type === SocialType.MEDIUM && (
                <Icon type="platform-medium" />
              )}
              {social.type === SocialType.TELEGRAM && (
                <Icon type="platform-telegram" />
              )}
              {social.type === SocialType.X && <Icon type="platform-x" />}
              {social.type === SocialType.YOUTUBE && (
                <Icon type="platform-youtube" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

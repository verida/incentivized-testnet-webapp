import React from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { ReactComponent as ExternalIcon } from "~/assets/icons/link-external.svg";
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
    <div className="max-w-partner-overview-card min-w-partner-overview h-fit bg-transparent-3 relative">
      <div className="absolute bottom-[calc(100%_-_10px)] left-0 bg-partner-overview-primary text-white font-semibold px-4 pt-1 pb-[14px] rounded-tr-lg rounded-tl-lg border border-partner-overview-primary z-0 text-base-s">
        {badgeText}
      </div>
      <div className="bg-partnerOverviewBg backdrop-blur-4xl px-4 py-6 md:p-6 rounded-xl relative border-partner-overview-primary border z-10 flex flex-col gap-6">
        <div className="flex items-center h-16">
          <img
            src={partner.image || "/images/partners/default.png"}
            alt={partner.id}
            className="h-full w-auto rounded-full bg-white p-3"
          />
          <div className="flex flex-col ml-auto h-full bg-backButtonBackground hover:text-white gap-1 px-2 py-1.5 rounded-lg text-center">
            <span className="block text-desktop-base font-semibold">
              {missions.length}
            </span>
            <span className="block text-base-s">{missionText}</span>
          </div>
        </div>
        <div className="flex flex-col w-full gap-2">
          <h3 className="text-white text-desktop-heading-s">
            {i18n.formatMessage(partner.title)}
          </h3>
          <span className="text-white text-base">
            {i18n.formatMessage(partner.shortDescription)}
          </span>
        </div>
        <div className="flex gap-6 flex-wrap">
          {partner.resources?.map((resource, index) => (
            <Link
              to={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-2 items-center text-link-color hover:text-white transition text-base-s"
              key={index}
            >
              <ExternalIcon width={16} height={16} />
              {i18n.formatMessage(resource.label)}
            </Link>
          ))}
        </div>
        <div className="flex justify-start items-center gap-3 text-link-color flex-wrap">
          {partner.socials?.map((social, index) => (
            <Link
              to={social.link}
              className="rounded-full p-3 bg-white/10 hover:bg-white/30"
              key={index}
            >
              {social.type === SocialType.DISCORD && (
                <Icon type="platform-discord" size={16} />
              )}
              {social.type === SocialType.LINKEDIN && (
                <Icon type="platform-linkedin" size={16} />
              )}
              {social.type === SocialType.MEDIUM && (
                <Icon type="platform-medium" size={16} />
              )}
              {social.type === SocialType.TELEGRAM && (
                <Icon type="platform-telegram" size={16} />
              )}
              {social.type === SocialType.X && (
                <Icon type="platform-x" size={16} />
              )}
              {social.type === SocialType.YOUTUBE && (
                <Icon type="platform-youtube" size={16} />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { Icon } from "~/components/atoms";
import { Partner, SocialType } from "~/features/partners";

export type PartnerInfoCardProps = {
  partner: Partner;
  nbActivities: number;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const PartnerInfoCard: React.FC<PartnerInfoCardProps> = (props) => {
  const { partner, nbActivities, ...divProps } = props;

  const i18n = useIntl();

  const cardBadgeLabel = i18n.formatMessage({
    id: "PartnerInfoCard.cardBadgeLabel",
    description: "Label above the partner info card",
    defaultMessage: "Partner",
  });

  const activityCounterLabel = i18n.formatMessage(
    {
      id: "PartnerInfoCard.activityCounterLabel",
      description:
        "Sub text for the number of activitiies in the counter in the partner info card",
      defaultMessage: `{nbActivities, plural,
        one {Activity}
        other {Activities}
      }`,
    },
    {
      nbActivities,
    }
  );

  return (
    <div {...divProps}>
      <div className="max-w-full lg:max-w-partner-info-card h-fit bg-transparent-3 relative">
        <div className="absolute bottom-[calc(100%_-_10px)] left-0 bg-partner-info-primary text-white font-semibold px-4 pt-1 pb-[14px] rounded-tr-lg rounded-tl-lg border border-partner-info-primary z-0 text-base-s">
          {cardBadgeLabel}
        </div>
        <div className="bg-partnerInfoBg backdrop-blur-4xl px-4 py-6 md:p-6 rounded-xl relative border-partner-info-primary border z-10 flex flex-col gap-6">
          <div className="flex items-center h-16">
            <img
              src={partner.image || "/images/partners/default.png"}
              alt={partner.id}
              className="h-full w-auto rounded-full bg-white p-3"
            />
            <div className="flex flex-col ml-auto h-full bg-backButtonBackground hover:text-white gap-1 px-2 py-1.5 rounded-lg text-center">
              <span className="block text-desktop-base font-semibold">
                {nbActivities}
              </span>
              <span className="block text-base-s">{activityCounterLabel}</span>
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
                {/* TODO: Use the ExternalLink component, add an optional prop to display the icon */}
                <Icon type="external-link" size={16} />
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
    </div>
  );
};

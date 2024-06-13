import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import {
  ExternalLink,
  Icon,
  IconButtonLink,
  Typography,
} from "~/components/atoms";
import { Partner, SocialType } from "~/features/partners";

export type PartnerInfoCardProps = {
  partner: Partner;
  nbActivities: number;
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const PartnerInfoCard: React.FC<PartnerInfoCardProps> = (props) => {
  const { partner, nbActivities, className, ...divProps } = props;

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

  // TODO: Get that color from the partner definition
  // const partnerColor = "#733BD6";
  const partnerColor = "#E6007A";

  return (
    <div
      {...divProps}
      // Min width is the width of this component with 6 social links, so:
      // 2 * 1px (border) + 2 * 1.5rem (padding) + 6 * 16px (icon size) +
      // 6 * 0.75rem(icon padding) + 5 * 0.75(gap between icons)
      // = 98px + 15.75 rem
      className={twMerge("min-w-[calc(98px_+_15.75rem)]", className)}
    >
      <div className="relative">
        <div
          className="absolute bottom-[calc(100%_-_0.75rem)] left-0 pb-3 rounded-t-lg"
          // bottom-[calc(100%_-_0.75rem)] is the negative value of the border-radius of the card
          // pb-3 has same height as the border-radius of the card
          style={{
            backgroundColor: partnerColor,
          }}
        >
          <div className="px-4 py-1">
            <Typography variant="base-s">{cardBadgeLabel}</Typography>
          </div>
        </div>
        <div
          className="rounded-xl p-px backdrop-blur-0"
          // Use the backdrop to hide the above div underneath this one, which
          // allow us to avoid a z index
          style={{
            background: `linear-gradient(135deg, ${partnerColor} 10%, hsla(var(--white) / 0.15) 90%)`,
          }}
        >
          <div
            className="px-4 py-6 md:p-6 rounded-xl flex flex-col gap-6"
            style={{
              background:
                "linear-gradient(135deg, hsla(var(--black) / 0.7) 10%, hsla(var(--background) / 1) 90%)",
            }}
          >
            <div className="flex flex-row justify-between items-stretch">
              <img
                src={partner.image || "/images/partners/default.png"}
                alt={partner.id}
                className="h-16 aspect-square rounded-full bg-white p-3"
              />
              <div className="bg-transparent-8 rounded-lg flex flex-col items-center justify-center gap-1 px-2 py-1.5 ">
                <Typography variant="base">{nbActivities}</Typography>
                <Typography variant="base-s" className="text-muted-foreground">
                  {activityCounterLabel}
                </Typography>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Typography variant="heading-s" component="p">
                {i18n.formatMessage(partner.title)}
              </Typography>
              <Typography variant="base-s" className="text-muted-foreground">
                {i18n.formatMessage(partner.shortDescription)}
              </Typography>
            </div>
            <div className="flex flex-row gap-6 flex-wrap">
              {partner.resources?.map((resource) => (
                <ExternalLink
                  key={resource.url}
                  href={resource.url}
                  openInNewTab
                  className="flex flex-row gap-2 items-center text-primary hover:text-primary-background-hover no-underline hover:underline"
                >
                  {/* TODO: Use the ExternalLink component, add an optional prop to display the icon */}
                  <Icon type="external-link" size={16} />
                  <Typography variant="base-s">
                    {i18n.formatMessage(resource.label)}
                  </Typography>
                </ExternalLink>
              ))}
            </div>
            <div className="flex flex-row justify-start items-center gap-3 flex-wrap">
              {partner.socials?.map((social) => (
                <IconButtonLink
                  key={social.link}
                  href={social.link}
                  shape="circle"
                  className="rounded-full p-3 bg-white/10 hover:bg-white/30"
                  icon={
                    <Icon
                      type={
                        social.type === SocialType.DISCORD
                          ? "platform-discord"
                          : social.type === SocialType.LINKEDIN
                            ? "platform-linkedin"
                            : social.type === SocialType.MEDIUM
                              ? "platform-medium"
                              : social.type === SocialType.TELEGRAM
                                ? "platform-telegram"
                                : social.type === SocialType.X
                                  ? "platform-x"
                                  : social.type === SocialType.YOUTUBE
                                    ? "platform-youtube"
                                    : "external-link"
                      }
                      size={16}
                    />
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

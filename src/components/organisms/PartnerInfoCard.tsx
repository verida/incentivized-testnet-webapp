import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import {
  ExternalLink,
  Icon,
  IconButtonLink,
  Typography,
} from "~/components/atoms";
import { TabbedCardBase } from "~/components/molecules";
import { Partner, getPartnerSocialIcon } from "~/features/partners";

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

  return (
    <div
      {...divProps}
      // Defining a fixed width for this component with 6 social links, so:
      // 2 * 1px (border) + 2 * 1.5rem (padding) + 6 * 16px (icon size) +
      // 6 * 0.75rem(icon padding) + 5 * 0.75(gap between icons)
      // = 98px + 15.75 rem
      className={twMerge(
        "w-[calc(98px_+_15.75rem)] sm:min-w-[calc(98px_+_15.75rem)]",
        className
      )}
    >
      <TabbedCardBase
        label={cardBadgeLabel}
        backgroundColor={partner.accentColor}
        foregroundColor={partner.accentForegoundColor}
      >
        <div className="flex flex-row justify-between items-stretch">
          <img
            src={partner.logo}
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
            {partner.name}
          </Typography>
          <Typography variant="base-s" className="text-muted-foreground">
            {i18n.formatMessage(partner.description)}
          </Typography>
        </div>
        <div className="flex flex-row gap-6 flex-wrap">
          {partner.resources.map((resource) => (
            <ExternalLink
              key={resource.url}
              href={resource.url}
              openInNewTab
              className="flex flex-row gap-2 items-center no-underline hover:underline"
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
          {partner.socials.map((social) => {
            const icon = getPartnerSocialIcon(social.type, 16);

            return (
              <IconButtonLink
                key={social.url}
                href={social.url}
                shape="circle"
                className="rounded-full p-3 bg-white/10 hover:bg-white/30"
                icon={icon}
              />
            );
          })}
        </div>
      </TabbedCardBase>
    </div>
  );
};

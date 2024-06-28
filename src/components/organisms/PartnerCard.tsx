import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { Typography } from "~/components/atoms";
import { Partner } from "~/features/partners";

export type PartnerCardProps = {
  partner: Partner;
} & Omit<React.ComponentPropsWithRef<"article">, "children">;

export const PartnerCard: React.FC<PartnerCardProps> = (props) => {
  const { partner, className, ...articleProps } = props;

  const i18n = useIntl();

  const partnerLogoAlt = i18n.formatMessage(
    {
      id: "PartnerCard.partnerLogoAlt",
      description: "Alt for the logo of a partner",
      defaultMessage: "Logo of {partnerName}",
    },
    {
      partnerName: partner.name,
    }
  );

  // TODO: Use container query rather than media query to adapt the content based on the container size for smoother transitions
  return (
    <article
      {...articleProps}
      className={twMerge(
        "border border-border hover:border-border-hover bg-background-light hover:bg-background-extra-light rounded-3xl md:rounded-5xl flex flex-col items-center justify-center py-8 lg:py-12 gap-6 md:gap-10",
        className
      )}
    >
      <img
        src={partner.logo}
        alt={partnerLogoAlt}
        className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 w-20 md:w-30"
      />
      <Typography variant="heading-m" component="p" className="text-center">
        {partner.name}
      </Typography>
    </article>
  );
};

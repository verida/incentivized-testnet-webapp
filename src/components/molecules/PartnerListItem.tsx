import { useIntl } from "react-intl";
import { Link } from "react-router-dom";

import { Typography } from "~/components/atoms";
import { Partner } from "~/features/partners";

export type PartnersListItemProps = {
  partner: Partner;
} & Omit<React.ComponentPropsWithRef<"article">, "children">;

export const PartnerListItem: React.FC<PartnersListItemProps> = (props) => {
  const { partner, ...articleProps } = props;

  const i18n = useIntl();

  const partnerLogoAlt = i18n.formatMessage(
    {
      id: "PartnerListItem.partnerLogoAlt",
      description: "Alt for the logo of a partner",
      defaultMessage: "Logo of {partnerName}",
    },
    {
      partnerName: partner.name,
    }
  );

  // TODO: Use container query rather than media query to adapt the content based on the container size for smoother transitions
  return (
    <article {...articleProps}>
      <Link to={`/partners/${partner.id}`}>
        <div className="border border-border hover:border-border-30 bg-background-light hover:bg-background-extra-light rounded-3xl md:rounded-10 flex flex-col items-center justify-center py-8 lg:py-12 gap-6 md:gap-10">
          <img
            src={partner.logo}
            alt={partnerLogoAlt}
            className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 w-20 md:w-30"
          />
          <Typography variant="heading-m" component="p" className="text-center">
            {partner.name}
          </Typography>
        </div>
      </Link>
    </article>
  );
};

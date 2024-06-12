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

  const alt = i18n.formatMessage({
    id: "PartnersPage.alt",
    description: "Description of alt",
    defaultMessage: "partner avatar",
  });

  const title = i18n.formatMessage(partner.title);

  return (
    <article {...articleProps}>
      <Link to={`/partners/${partner.id}`}>
        <div className="bg-customGradient p-0.25 overflow-hidden rounded-3xl md:rounded-10 hover:bg-white/60 w-full">
          <div className="rounded-3xl md:rounded-10 flex flex-col items-center py-8 md:py-8 lg:py-12 h-full w-full justify-center bg-partnerListItemBackgroundColor hover:bg-partnerListItemBackgroundColor-HOVER gap-6 md:gap-10">
            <img
              src={partner.image}
              alt={alt}
              className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 w-20 md:w-30"
            />
            <Typography variant="heading-m" component="p">
              {title}
            </Typography>
          </div>
        </div>
      </Link>
    </article>
  );
};

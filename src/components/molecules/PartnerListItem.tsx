import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { Typography } from "~/components/atoms";
import { Partner } from "~/features/partners";

export type PartnersListItemProps = {
  partner: Partner;
  small?: boolean;
} & Omit<React.ComponentPropsWithRef<"article">, "children">;

export const PartnerListItem: React.FC<PartnersListItemProps> = (props) => {
  const { partner, small, ...articleProps } = props;

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
      <div
        className={twMerge(
          "border border-border hover:border-border-hover hover:shadow-3xl bg-background-light hover:bg-background-extra-light flex flex-col items-center justify-center",
          small
            ? "rounded-3xl py-8 gap-6"
            : "rounded-3xl md:rounded-10 py-8 lg:py-12 gap-6 md:gap-10"
        )}
      >
        <img
          src={partner.logo}
          alt={partnerLogoAlt}
          className={twMerge(
            "bg-white",
            small
              ? "rounded-2xl p-4 w-20"
              : "rounded-2xl md:rounded-3xl p-4 md:p-6 w-20 md:w-30"
          )}
        />
        <Typography
          variant="heading-m"
          component="p"
          className={twMerge("text-center", small ? "!text-xl" : "")}
        >
          {partner.name}
        </Typography>
      </div>
    </article>
  );
};

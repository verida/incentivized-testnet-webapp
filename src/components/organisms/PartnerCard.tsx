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

  return (
    <article
      {...articleProps}
      className={twMerge(
        "border border-border bg-background-light rounded-3xl flex flex-col items-center justify-center gap-6",
        className
      )}
    >
      <div className="pt-8 pb-0 px-[20%] w-full flex flex-row justify-center">
        <img
          src={partner.logo}
          alt={partnerLogoAlt}
          className="bg-white rounded-2xl p-4 w-full max-w-36 aspect-square"
        />
      </div>
      <div className="pb-8">
        <Typography
          variant="heading-s"
          component="p"
          className="text-center line-clamp-1"
        >
          {partner.name}
        </Typography>
      </div>
    </article>
  );
};

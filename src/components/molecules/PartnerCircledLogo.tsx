import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { usePartner } from "~/features/partners";

export type PartnerCircledLogoProps = {
  partnerId: string;
} & React.ComponentPropsWithRef<"div">;

export const PartnerCircledLogo: React.FC<PartnerCircledLogoProps> = (
  props
) => {
  const { partnerId, className, ...divProps } = props;

  const { partner } = usePartner(partnerId);

  const i18n = useIntl();

  const partnerLogoAlt = i18n.formatMessage(
    {
      id: "PartnerCircledLogo.partnerLogoAlt",
      description: "Alt for the logo of a partner",
      defaultMessage: "Logo of {partnerName}",
    },
    {
      partnerName: partner?.name,
    }
  );

  if (!partner) {
    return null;
  }

  return (
    <div
      className={twMerge(
        "relative flex justify-center items-center w-8 h-8",
        className
      )}
      {...divProps}
    >
      <div className="p-1 border border-foreground rounded-full">
        <div
          className="bg-white rounded-full p-1"
          style={{
            boxShadow: `0px 0.856px 13.695px 0px ${partner.accentColor}`,
          }}
        >
          <img
            src={partner.logo}
            alt={partnerLogoAlt}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

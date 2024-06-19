import { ReactComponent as PartnerEllipse } from "assets/images/partner_ellipse.svg";
import { useIntl } from "react-intl";

import { usePartner } from "~/features/partners";

export type PartnerCircledLogoProps = {
  partnerId: string;
};

export const PartnerCircledLogo: React.FC<PartnerCircledLogoProps> = (
  props
) => {
  const { partnerId } = props;

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
    <div className="relative flex justify-center items-center w-12 h-12 md:w-20 md:h-20">
      <PartnerEllipse />
      <div className="absolute p-2 md:p-3">
        <div
          className="bg-white rounded-full p-1 md:p-2"
          style={{
            boxShadow: `0px 1.926px 30.815px 0px ${partner.accentColor}`,
          }}
        >
          <img src={partner.logo} alt={partnerLogoAlt} className="" />
        </div>
      </div>
    </div>
  );
};

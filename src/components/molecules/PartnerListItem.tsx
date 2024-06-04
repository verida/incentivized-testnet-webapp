import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";

import { Partner } from "~/features/activity";

export const PartnerListItem = ({
  partner,
  size,
}: {
  partner: Partner;
  size?: "Large" | "Small";
}) => {
  const i18n = useIntl();
  const alt = i18n.formatMessage({
    id: "PartnersPage.alt",
    description: "Description of alt",
    defaultMessage: "partner avatar",
  });

  const navigate = useNavigate();
  const title = i18n.formatMessage(partner.title);

  return (
    <div
      className={
        "bg-customGradient p-0.25 overflow-hidden rounded-3xl md:rounded-10 hover:bg-white/60 w-full lg:max-w-partner-item lg:max-h-partner-item"
      }
    >
      <div
        className={
          "rounded-3xl md:rounded-10 flex flex-col items-center py-8 md:py-8 lg:py-12 h-full w-full justify-center bg-partnerListItemBackgroundColor hover:bg-partnerListItemBackgroundColor-HOVER cursor-pointer gap-6 md:gap-10"
        }
        onClick={() => navigate(`/partners/${partner.id}`)}
      >
        <img
          src={partner.image}
          alt={alt}
          className={
            "bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 w-20 md:w-30"
          }
        />
        <h4 className={"text-desktop-heading-s md:text-desktop-heading-m"}>
          {title}
        </h4>
      </div>
    </div>
  );
};

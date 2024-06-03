import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";

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

  const [wrapperClasses, setWrapperClasses] = useState<string>("");
  const [imageClasses, setImageClasses] = useState<string>("");
  const [textClasses, setTextClasses] = useState<string>("");

  useEffect(() => {
    const _size = size || "Large";
    if (_size === "Large") {
      setWrapperClasses("gap-6 md:gap-10");
      setImageClasses("w-20 md:w-[120px]");
      setTextClasses(
        "text-[20px] md:text-[28px] leading-[120%] font-semibold md:font-bold"
      );
    } else {
      setWrapperClasses("w-[176px] h-[192px] gap-2 md:gap-5");
      setImageClasses("w-[80px]");
      setTextClasses("text-[20px] leading-[120%] ");
    }
  }, [size]);
  return (
    <div
      className={twMerge(
        "bg-customGradient p-0.25 overflow-hidden rounded-3xl md:rounded-10 hover:bg-white/60 w-full lg:max-w-[280px] lg:max-h-[290px]"
      )}
    >
      <div
        className={twMerge(
          "rounded-3xl md:rounded-10 flex flex-col items-center py-8 md:py-8 lg:py-12 h-full w-full justify-center bg-partnerListItemBackgroundColor hover:bg-partnerListItemBackgroundColor-HOVER cursor-pointer",
          wrapperClasses
        )}
        onClick={() => navigate(`/partners/${partner.id}`)}
      >
        <img
          src={partner.image}
          alt={alt}
          className={twMerge(
            "bg-white rounded-[16px] md:rounded-[24px] p-[16px] md:p-[24px]",
            imageClasses
          )}
        />
        <h4 className={twMerge("", textClasses)}>{title}</h4>
      </div>
    </div>
  );
};

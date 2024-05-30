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
      setWrapperClasses(
        "w-[160px] h-[165px] md:w-[280px] md:h-[290px] gap-4 md:gap-10"
      );
      setImageClasses("w-[80px] md:w-[120px]");
      setTextClasses("text-[20px] md:text-[28px]");
    } else {
      setWrapperClasses(
        "w-[160px] h-[165px] md:w-[176px] md:h-[192px] gap-2 md:gap-5"
      );
      setImageClasses("w-[80px]");
      setTextClasses("text-[20px]");
    }
  }, [size]);
  return (
    <div className="bg-customGradient p-[1px] overflow-hidden rounded-[24px] md:rounded-[40px] hover:rounded-[16px] md:hover:rounded-[24px]">
      <div
        className={twMerge(
          "rounded-[24px] md:rounded-[40px] hover:rounded-[16px] md:hover:rounded-[24px] flex flex-col items-center justify-center bg-partnerListItemBackgroundColor cursor-pointer",
          wrapperClasses
        )}
        onClick={() => navigate(`/partner/${partner.id}`)}
      >
        <img
          src={partner.image}
          alt={alt}
          className={twMerge("bg-white rounded-[18px] p-1 ", imageClasses)}
        />
        <h4 className={twMerge("font-bold", textClasses)}>{title}</h4>
      </div>
    </div>
  );
};

import { useIntl } from "react-intl";
import { useLocation } from "react-router-dom";

export const PartnerPage = () => {
  const i18n = useIntl();
  const header = i18n.formatMessage({
    id: "PartnerPage.id",
    description: "Description",
    defaultMessage: "Partner",
  });
  const location = useLocation();
  const partnerId = location.pathname?.split("/")?.[2];
  console.log("partnerId: ", partnerId);

  return (
    <>
      <span className="">{header}</span>
    </>
  );
};

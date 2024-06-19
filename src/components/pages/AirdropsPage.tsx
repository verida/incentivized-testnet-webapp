import React from "react";
import { useIntl } from "react-intl";

import { PageLayout } from "~/components/templates";

export const AirdropsPage: React.FC = () => {
  const i18n = useIntl();

  const title = i18n.formatMessage({
    id: "AirdropsPage.title",
    description: "Title of the Airdrops page",
    defaultMessage: "Airdrops",
  });

  return <PageLayout title={title}></PageLayout>;
};

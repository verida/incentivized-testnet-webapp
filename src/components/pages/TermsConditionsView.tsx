import React from "react";
import { useIntl } from "react-intl";

import { TermsAndConditions } from "~/components/organisms";
import { PageLayout } from "~/components/templates";

export const TermsConditionsView: React.FunctionComponent = () => {
  const i18n = useIntl();

  const termsConditionsTitle = i18n.formatMessage({
    id: "TermsConditionsView.termsConditionsTitle",
    defaultMessage: "Terms of Use",
    description: "Title for the terms and conditions page",
  });

  return (
    <PageLayout title={termsConditionsTitle}>
      <TermsAndConditions className="mt-16" />
    </PageLayout>
  );
};

import React from "react";
import { useIntl } from "react-intl";

import { PageWrapper } from "~/components/molecules";
import { TermsAndConditions } from "~/components/organisms";

export const TermsConditionsView: React.FunctionComponent = () => {
  const i18n = useIntl();

  const termsConditionsTitle = i18n.formatMessage({
    id: "TermsConditionsView.termsConditionsTitle",
    defaultMessage: "Terms of Use",
    description: "Title for the terms and conditions page",
  });

  return (
    <PageWrapper title={termsConditionsTitle}>
      <TermsAndConditions className="mt-16" />
    </PageWrapper>
  );
};

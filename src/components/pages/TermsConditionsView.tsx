import React from "react";
import { useIntl } from "react-intl";

import { TermsAndConditions } from "~/components/organisms";

type TermsConditionsViewProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children"
>;

export const TermsConditionsView: React.FunctionComponent<
  TermsConditionsViewProps
> = (props) => {
  const i18n = useIntl();

  const termsConditionsTitle = i18n.formatMessage({
    id: "TermsConditionsView.termsConditionsTitle",
    defaultMessage: "Verida Incentivized Testnet Terms of Use",
    description: "Title for the terms and conditions page",
  });

  return (
    <div {...props}>
      <div className="flex flex-grow flex-col items-center justify-center gap-12 pt-4">
        <h1 className="text-3xl md:text-5xl font-bold">
          {termsConditionsTitle}
        </h1>
        <TermsAndConditions />
      </div>
    </div>
  );
};

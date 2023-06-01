import React from "react";

import { useTermsConditions } from "~/features/termsconditions";

type TermsAndConditionsProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "children"
>;

export const TermsAndConditions: React.FunctionComponent<
  TermsAndConditionsProps
> = (props) => {
  const { getLatestVersion } = useTermsConditions();

  // TODO: Get localised version of the terms and conditions
  const termsAndConditions = getLatestVersion();

  return (
    <div {...props}>
      <p>{termsAndConditions}</p>
    </div>
  );
};

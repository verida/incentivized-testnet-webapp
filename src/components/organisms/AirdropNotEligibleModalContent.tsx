import React from "react";
import { useIntl } from "react-intl";

import { Alert } from "~/components/molecules";

export type AirdropNotEligibleModalContentProps = Omit<
  React.ComponentProps<"div">,
  "children"
>;

export const AirdropNotEligibleModalContent: React.FC<
  AirdropNotEligibleModalContentProps
> = (props) => {
  const { ...divProps } = props;

  const i18n = useIntl();

  const notEligibleAlertMessage = i18n.formatMessage({
    id: "AirdropNotEligibleModalContent.notEligibleAlertMessage",
    defaultMessage: "Unfortunately, you are not eligible for this airdrop.",
    description:
      "Message displayed in the airdrop modal when the user is not eligible for the airdrop.",
  });

  return (
    <div {...divProps}>
      <Alert type="warning" message={notEligibleAlertMessage} />
    </div>
  );
};

import React from "react";
import { useIntl } from "react-intl";

import { Alert } from "~/components/molecules";

export type AirdropClaimNotRegisteredModalContentProps = Omit<
  React.ComponentProps<"div">,
  "children"
>;

export const AirdropClaimNotRegisteredModalContent: React.FC<
  AirdropClaimNotRegisteredModalContentProps
> = (props) => {
  const { ...divProps } = props;

  const i18n = useIntl();

  const notRegisteredAlertMessage = i18n.formatMessage({
    id: "AirdropClaimNotRegisteredModalContent.notRegisteredAlertMessage",
    defaultMessage: "Unfortunately, you are not registered for this airdrop.",
    description:
      "Message displayed in the airdrop claim modal when the user is not registered for the airdrop.",
  });

  return (
    <div {...divProps}>
      <Alert type="warning" message={notRegisteredAlertMessage} />
    </div>
  );
};

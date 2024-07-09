import React from "react";
import { useIntl } from "react-intl";

import { Alert } from "~/components/molecules";

export type AirdropNotRegisteredModalContentProps = Omit<
  React.ComponentProps<"div">,
  "children"
>;

export const AirdropNotRegisteredModalContent: React.FC<
  AirdropNotRegisteredModalContentProps
> = (props) => {
  const { ...divProps } = props;

  const i18n = useIntl();

  const notRegisteredAlertMessage = i18n.formatMessage({
    id: "AirdropNotRegisteredModalContent.notRegisteredAlertMessage",
    defaultMessage: "Unfortunately, you are not registered for this airdrop.",
    description:
      "Message displayed in the airdrop modal when the user is not registered for the airdrop.",
  });

  return (
    <div {...divProps}>
      <Alert type="warning" message={notRegisteredAlertMessage} />
    </div>
  );
};

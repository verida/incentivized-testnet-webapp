import React from "react";
import { useIntl } from "react-intl";

import AirdropFailureImage from "~/assets/images/airdrop_fail.png";
import { Typography } from "~/components/atoms";

export type AirdropClaimFailureModalContentProps = {
  errorMessage?: string;
  errorUserMessage?: string;
} & Omit<React.ComponentProps<"div">, "children">;

export const AirdropClaimFailureModalContent: React.FC<
  AirdropClaimFailureModalContentProps
> = (props) => {
  const { errorMessage, errorUserMessage, ...divProps } = props;

  const i18n = useIntl();

  const title = i18n.formatMessage({
    id: "AirdropClaimFailureModalContent.title",
    defaultMessage: "Claim failed!",
    description: "Title in the content of the Airdrop claim failure modal",
  });

  const subtitle = i18n.formatMessage({
    id: "AirdropClaimFailureModalContent.subtitle",
    defaultMessage:
      "Unfortunately, your claim could not be processed at this time. We apologize for the inconvenience. Please try again later.",
    description: "Subtitle in the content of the Airdrop claim failure modal",
  });

  // TODO: Handle the types of error

  return (
    <div {...divProps}>
      <div className="flex flex-col gap-8 items-center">
        <div>
          <img src={AirdropFailureImage} alt="" className="h-20" />
        </div>
        <div className="flex flex-col gap-3 items-center text-center">
          <Typography variant="heading-l">{title}</Typography>
          <Typography variant="base">{subtitle}</Typography>
        </div>
      </div>
    </div>
  );
};

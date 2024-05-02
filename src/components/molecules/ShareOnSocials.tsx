import React from "react";
import { useIntl } from "react-intl";

import { ButtonLink, Icon } from "~/components/atoms";
import { buildXShareUrl } from "~/features/airdrops";

export type ShareOnSocialsProps = {
  sharedMessage: string;
} & React.ComponentPropsWithRef<"div">;

export const ShareOnSocials: React.FunctionComponent<ShareOnSocialsProps> = (
  props
) => {
  const { sharedMessage, ...divProps } = props;

  const i18n = useIntl();

  const shareOnX = i18n.formatMessage({
    id: "ShareOnSocials.shareOnX",
    description:
      "Label of the Share on X. The X is a logo appended after this message",
    defaultMessage: "Share on",
  });

  const xUrl = buildXShareUrl(sharedMessage);

  return (
    <div {...divProps}>
      <ButtonLink href={xUrl} openInNewTab>
        {shareOnX}
        <Icon type="platform-x" />
      </ButtonLink>
    </div>
  );
};

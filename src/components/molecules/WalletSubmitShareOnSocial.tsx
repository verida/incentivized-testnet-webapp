import React from "react";
import { useIntl } from "react-intl";

import { ButtonLink, ExternalLink, Icon, Typography } from "~/components/atoms";
import { VERIDA_BLOG_POST_VDA_WHITELIST } from "~/constants";
import { VDA_WHITELIST_TWEET_ID, buildXShareUrl } from "~/features/rewards";
import { useVerida } from "~/features/verida";

export type WalletSubmitShareOnSocialProps = React.ComponentPropsWithRef<"div">;

export const WalletSubmitShareOnSocial: React.FunctionComponent<
  WalletSubmitShareOnSocialProps
> = (props) => {
  const { ...divProps } = props;

  const { did } = useVerida();
  const i18n = useIntl();

  const message = i18n.formatMessage({
    id: "WalletSubmitShareOnSocial.message",
    description: "Section title for the share on social media",
    defaultMessage:
      "Share your identity on social media to be eligible for the",
  });

  const linkLabel = i18n.formatMessage({
    id: "WalletSubmitShareOnSocial.linkLabel",
    description: "Section title for the share on social media",
    defaultMessage: "Verida Storage Credit Community Pre-Sale",
  });

  const shareOnX = i18n.formatMessage({
    id: "WalletSubmitShareOnSocial.shareOnX",
    description:
      "Label of the Share on X. The X is a logo appended after this message",
    defaultMessage: "Share on",
  });

  const sharedDataText = i18n.formatMessage(
    {
      id: "WalletSubmitShareOnSocial.sharedDataText",
      description: "Text of the shared data",
      defaultMessage: "I just submitted my wallet address for my DID: {did}",
    },
    { did }
  );

  const xUrl = buildXShareUrl(sharedDataText, VDA_WHITELIST_TWEET_ID);

  return (
    <div {...divProps}>
      <Typography variant="base">
        {message}
        <ExternalLink
          href={VERIDA_BLOG_POST_VDA_WHITELIST}
          openInNewTab
          className="ml-1"
        >
          {linkLabel}
        </ExternalLink>
      </Typography>
      <div className="mt-8">
        <ButtonLink href={xUrl} openInNewTab>
          {shareOnX}
          <Icon type="platform-x" />
        </ButtonLink>
      </div>
    </div>
  );
};

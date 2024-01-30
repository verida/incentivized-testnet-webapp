import React from "react";
import { useIntl } from "react-intl";

import {
  Icon,
  IconButton,
  IconButtonLink,
  Typography,
} from "~/components/atoms";
import {
  hasWebShare,
  shareData,
  sharingPlatformDefinitions,
} from "~/features/share";

export type WalletSubmitShareOnSocialProps = React.ComponentPropsWithRef<"div">;

export const WalletSubmitShareOnSocial: React.FunctionComponent<
  WalletSubmitShareOnSocialProps
> = (props) => {
  const { ...divProps } = props;

  const i18n = useIntl();

  const title = i18n.formatMessage({
    id: "WalletSubmitShareOnSocial.title",
    description: "Section title for the share on social media",
    defaultMessage: "Share it on social media!",
  });

  const sharedDataTitle = i18n.formatMessage({
    id: "WalletSubmitShareOnSocial.sharedDataTitle",
    description: "Title of the share data",
    defaultMessage: "I just completed Verida Missions, come join the community",
  });

  const dataToShare = {
    title: sharedDataTitle,
    url: window.location.href,
  };

  const canWebShare = hasWebShare();

  const platforms = Object.values(sharingPlatformDefinitions);

  return (
    <div {...divProps}>
      <Typography variant="base" className="text-center">
        {title}
      </Typography>
      <ul className="mt-4 flex flex-row gap-8 justify-center">
        {platforms.map((platform) => (
          <li key={platform.platformId}>
            <IconButtonLink
              href={platform.getUrl(dataToShare.url, dataToShare.title)}
              icon={<Icon type={platform.iconId} />}
              shape="square"
              openInNewTab
            />
          </li>
        ))}
        {canWebShare ? (
          <li key="share">
            <IconButton
              icon={<Icon type="share" />}
              onClick={() => void shareData(dataToShare)}
            />
          </li>
        ) : null}
      </ul>
    </div>
  );
};

import { useIntl } from "react-intl";

import { Icon } from "~/components/atoms";
import { VDA_LINK } from "~/constants";

export type TopBannerProps = Omit<
  React.ComponentPropsWithRef<"div">,
  "children"
>;

export const TopBanner: React.FC<TopBannerProps> = (props) => {
  const { ...divProps } = props;

  const i18n = useIntl();

  const topBannerContent = i18n.formatMessage({
    id: "TopBanner.topBannerContent",
    description: "Content displayed in the top banner",
    defaultMessage:
      "The Verida Storage Credit Token (VDA) is now live. Learn more",
  });

  return (
    <div {...divProps}>
      <div className="bg-gradient-to-r from-topBanner-grad1 to-topBanner-grad2 text-topBanner-foreground p-3 flex justify-center">
        <a
          href={VDA_LINK}
          className="flex hover:underline underline-offset-1 gap-2"
          target="_blank"
          rel="noreferrer"
        >
          {topBannerContent}
          <Icon type="arrow-right" size={20} />
        </a>
      </div>
    </div>
  );
};

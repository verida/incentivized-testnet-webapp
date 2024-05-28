import { useIntl } from "react-intl";

import { Icon } from "~/components/atoms";
import { topBannerContent } from "~/features/topBanner";

export type TopBannerProps = Omit<
  React.ComponentPropsWithRef<"div">,
  "children"
>;

export const TopBanner: React.FC<TopBannerProps> = (props) => {
  const { ...divProps } = props;

  const i18n = useIntl();

  return (
    <div {...divProps}>
      <div className="bg-gradient-to-r from-topBanner-grad1 to-topBanner-grad2 text-topBanner-foreground p-3 flex justify-center">
        <a
          href={topBannerContent.url}
          className="flex hover:underline underline-offset-1 gap-2"
          target="_blank"
          rel="noreferrer"
        >
          {i18n.formatMessage(topBannerContent.message)}
          <Icon type="arrow-right" size={20} />
        </a>
      </div>
    </div>
  );
};

import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { Icon } from "~/components/atoms";
import { VDA_LINK } from "~/constants";

export const VDABanner = ({ classNames }: { classNames?: string }) => {
  const i18n = useIntl();
  const vdaLinkAriaLabel = i18n.formatMessage({
    id: "Header.vdaLinkAriaLabel",
    description: "Aria label for the VDA link in the Header",
    defaultMessage: "Link of VDA website",
  });

  const vdaLinkLabel = i18n.formatMessage({
    id: "Header.vdaLinkLabel",
    description: "Label for the VDA link in the Header",
    defaultMessage:
      "The Verida Storage Credit Token (VDA) is now live. Learn more",
  });
  return (
    <div
      className={twMerge(
        "w-full bg-bannerBackgroundColor p-3 flex items-center justify-center",
        classNames
      )}
    >
      <a
        href={VDA_LINK}
        aria-label={vdaLinkAriaLabel}
        className="flex hover:underline underline-offset-1 gap-2"
        target="_blank"
        rel="noreferrer"
      >
        {vdaLinkLabel}
        <Icon type="arrow-right" size={20} />
      </a>
    </div>
  );
};

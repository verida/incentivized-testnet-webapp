import React, { useCallback, useEffect, useState } from "react";

import { Icon, IconButton } from "~/components/atoms";
import {
  COPIED_TO_CLIPBOARD_DEFAULT_TIMEOUT,
  copyToClipboard,
} from "~/features/clipboard";

type CopyToClipboardButtonProps = {
  value: string;
  iconSize?: number | string;
  onCopy?: (isCopied: boolean) => void;
} & React.ComponentPropsWithRef<"div"> &
  Pick<React.ComponentPropsWithRef<typeof IconButton>, "size">;

export const CopyToClipboardButton: React.FunctionComponent<
  CopyToClipboardButtonProps
> = (props) => {
  const { value, iconSize, size = "small", onCopy, ...divProps } = props;

  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    const handler = async () => {
      try {
        const isCopied = await copyToClipboard(value);
        setCopied(isCopied);
        onCopy?.(isCopied);
      } catch (error) {
        // TODO: Handle 'copy to clipboard' error
      }
    };
    void handler();
  }, [value, onCopy]);

  useEffect(() => {
    if (!copied) {
      return;
    }
    const timer = setTimeout(() => {
      setCopied(false);
    }, COPIED_TO_CLIPBOARD_DEFAULT_TIMEOUT);

    return () => {
      clearTimeout(timer);
    };
  }, [copied]);

  return (
    <div {...divProps}>
      <IconButton
        variant="contained"
        size={size}
        icon={<Icon type={copied ? "check" : "copy"} size={iconSize} />}
        onClick={handleCopy}
        disabled={copied}
      />
    </div>
  );
};

import { defineMessage } from "react-intl";

import { VDA_TOKEN_PAGE_URL } from "~/constants";

export const topBannerContent = {
  message: defineMessage({
    id: "topBanner.vdaTokenMessage",
    description: "Content displayed in the top banner for the VDA token",
    defaultMessage:
      "The Verida Storage Credit Token (VDA) is now live. Learn more",
  }),
  url: VDA_TOKEN_PAGE_URL,
};

import React from "react";
import { Helmet } from "react-helmet-async";
import { useIntl } from "react-intl";

import { DEFAULT_META_DESCRIPTION, DEFAULT_META_TITLE } from "~/constants";

type MetaTagsProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

export const MetaTags: React.FunctionComponent<MetaTagsProps> = (props) => {
  const { title, description, children } = props;

  const i18n = useIntl();

  const metaTitle = title || i18n.formatMessage(DEFAULT_META_TITLE);
  const metaDescription =
    description || i18n.formatMessage(DEFAULT_META_DESCRIPTION);

  return (
    <Helmet prioritizeSeoTags>
      <title>{metaTitle}</title>
      <meta name="title" content={metaTitle} />
      <meta property="og:title" content={metaTitle} />
      <meta property="twitter:title" content={metaTitle} />

      <meta name="description" content={metaDescription} />
      <meta property="og:description" content={metaDescription} />
      <meta property="twitter:description" content={metaDescription} />
      {children}
    </Helmet>
  );
};

import React from "react";
import { useIntl } from "react-intl";

import { ButtonLink, Typography } from "~/components/atoms";
import { veridaSupportPlatforms } from "~/constants";

const links = Object.values(veridaSupportPlatforms);

export const GetSupportSection: React.FunctionComponent = () => {
  const i18n = useIntl();

  const sectionTitle = i18n.formatMessage({
    id: "GetSupportSection.sectionTitle",
    defaultMessage: "Get Support",
    description: "Title of the 'Get Support' section",
  });

  return (
    <aside className="p-4 flex flex-col justify-center items-center gap-4">
      <Typography variant="heading-s" component="p">
        {sectionTitle}
      </Typography>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 max-w-5xl w-full">
        {links.map((link, index) => (
          <li key={index}>
            <ButtonLink href={link.url} openInNewTab>
              {link.icon}
              <span>{link.label}</span>
            </ButtonLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

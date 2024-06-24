import React from "react";
import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

import { ButtonLink, Typography } from "~/components/atoms";
import { veridaSupportPlatforms } from "~/constants";

const links = Object.values(veridaSupportPlatforms);

export type GetSupportSectionProps = Omit<
  React.ComponentPropsWithRef<"aside">,
  "children"
>;

export const GetSupportSection: React.FC<GetSupportSectionProps> = (props) => {
  const { className, ...asideProps } = props;

  const i18n = useIntl();

  const sectionTitle = i18n.formatMessage({
    id: "GetSupportSection.sectionTitle",
    defaultMessage: "Get Support",
    description: "Title of the 'Get Support' section",
  });

  return (
    <aside
      {...asideProps}
      className={twMerge(
        "p-4 flex flex-col justify-center items-center gap-4",
        className
      )}
    >
      <Typography variant="heading-s" component="p">
        {sectionTitle}
      </Typography>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6 w-full">
        {links.map((link, index) => (
          <li key={index}>
            <ButtonLink
              variant="contained"
              color="secondary"
              href={link.url}
              openInNewTab
              className="w-full"
            >
              {link.icon}
              <span>{link.label}</span>
            </ButtonLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

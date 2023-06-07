import React from "react";
import { useIntl } from "react-intl";

const links = [
  {
    label: "The Verida Acacia Testnet is Live",
    url: "https://news.verida.io/the-decentralized-verida-acacia-testnet-is-live-81503c119d9f",
  },
  {
    label:
      "Join Verida's Incentivized Testnet and Earn Tokens for Reclaiming Your Data",
    url: "https://news.verida.io/join-veridas-incentivized-testnet-and-earn-tokens-for-reclaiming-your-data-66607dd8d4f3",
  },
];

export const LearnMoreSection: React.FunctionComponent = () => {
  const i18n = useIntl();

  const sectionTitle = i18n.formatMessage({
    id: "LearnMoreSection.sectionTitle",
    defaultMessage: "Learn More",
    description: "Title of the 'Learn More' section",
  });

  return (
    <aside className="p-4 flex flex-col justify-center items-center gap-4">
      <p className="w-full text-center font-semibold text-lg">{sectionTitle}</p>
      <ul className="flex flex-col w-full text-center gap-2">
        {links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
};

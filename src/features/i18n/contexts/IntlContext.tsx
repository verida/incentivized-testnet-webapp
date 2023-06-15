import React, { useEffect, useState } from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";

import {
  defaultLocale,
  getMessages,
  getUserLocale,
} from "~/features/i18n/lang";
import { LocalizedMessages } from "~/features/i18n/types";
import { Sentry } from "~/features/sentry";

interface Props {
  children: React.ReactNode;
}

export const IntlProvider: React.FunctionComponent<Props> = (props) => {
  const [messages, setMessages] = useState<LocalizedMessages | undefined>(
    undefined
  );
  const locale = getUserLocale();

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messages = await getMessages(locale);
        setMessages(messages);
      } catch (error) {
        Sentry.captureException(error);
      }
    };
    void loadMessages();
  }, [locale]);

  return (
    <ReactIntlProvider
      key={locale}
      locale={locale}
      defaultLocale={defaultLocale}
      messages={messages}
      onError={(error: unknown) => {
        Sentry.captureException(error);
      }}
    >
      {props.children}
    </ReactIntlProvider>
  );
};

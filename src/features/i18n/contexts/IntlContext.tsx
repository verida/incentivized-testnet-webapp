import React, { useEffect, useState } from "react";
import { IntlProvider as ReactIntlProvider } from "react-intl";

import {
  defaultLocale,
  getMessages,
  getUserLocale,
} from "~/features/i18n/lang";
import { LocalizedMessages } from "~/features/i18n/types";

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
        // TODO: Handle error
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
      onError={(_error: unknown) => {
        // TODO: Handle i18n errors
      }}
    >
      {props.children}
    </ReactIntlProvider>
  );
};

import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

import {
  Footer,
  GetSupportSection,
  Header,
  HeaderOffset,
  LearnMoreSection,
} from "~/components/organisms";
import { ErrorBoundary } from "~/features/errors";
import { MetaTags } from "~/features/metatags";

export const AppLayout: React.FunctionComponent = () => {
  return (
    <>
      <MetaTags>
        <meta property="og:url" content={window.location.href} />
        <link rel="canonical" href={window.location.href} />
        <meta property="twitter:url" content={window.location.href} />
      </MetaTags>
      <ErrorBoundary defaultFallbackCardClassName="h-screen w-screen flex flex-col items-center justify-center">
        <div className="relative flex h-full w-full flex-col">
          <Header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[6px]" />
          <div className="flex min-h-screen flex-col bg-app">
            <HeaderOffset />
            <main className="mx-auto flex w-full max-w-screen-sm flex-grow flex-col px-4 pt-4">
              <ErrorBoundary defaultFallbackCardClassName="flex flex-col flex-grow justify-center">
                <Outlet />
              </ErrorBoundary>
            </main>
            <div className="mt-24">
              <GetSupportSection />
              <LearnMoreSection />
              <Footer />
            </div>
          </div>
        </div>
        <ScrollRestoration />
      </ErrorBoundary>
    </>
  );
};

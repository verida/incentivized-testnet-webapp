import React from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

import { TopBanner } from "~/components/molecules";
import { Footer, Header } from "~/components/organisms";
import { ErrorBoundary } from "~/features/errors";
import { MetaTags } from "~/features/metatags";

export const AppLayout: React.FC = () => {
  return (
    <>
      <MetaTags>
        <meta property="og:url" content={window.location.href} />
        <link rel="canonical" href={window.location.href} />
        <meta property="twitter:url" content={window.location.href} />
      </MetaTags>
      <ErrorBoundary defaultFallbackCardClassName="h-screen w-screen flex flex-col items-center justify-center">
        <div className="relative flex flex-col h-full w-full">
          <TopBanner />
          <Header className="sticky top-0 left-0 right-0 z-50 backdrop-blur-[6px]" />
          <div className="flex flex-col min-h-screen bg-app">
            <div className="flex-grow flex flex-col">
              <ErrorBoundary defaultFallbackCardClassName="flex flex-col flex-grow justify-center">
                <Outlet />
              </ErrorBoundary>
            </div>
            <Footer className="mt-4 sm:mt-6" />
          </div>
        </div>
        <ScrollRestoration />
      </ErrorBoundary>
    </>
  );
};

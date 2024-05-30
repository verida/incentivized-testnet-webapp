import React from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";

import { ReportIssueButton, TopBanner } from "~/components/molecules";
import {
  Footer,
  GetSupportSection,
  Header,
  LearnMoreSection,
} from "~/components/organisms";
import { ErrorBoundary } from "~/features/errors";
import { MetaTags } from "~/features/metatags";

export const AppLayout: React.FunctionComponent = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <MetaTags>
        <meta property="og:url" content={window.location.href} />
        <link rel="canonical" href={window.location.href} />
        <meta property="twitter:url" content={window.location.href} />
      </MetaTags>
      <ErrorBoundary defaultFallbackCardClassName="h-screen w-screen flex flex-col items-center justify-center">
        <div className="relative flex h-full w-full flex-col">
          <TopBanner />
          <Header className="sticky top-0 left-0 right-0 z-50 backdrop-blur-[6px]" />
          <div
            className={twMerge(
              "flex min-h-screen flex-col",
              path === "/" ? "bg-app" : ""
            )}
          >
            <div className="flex-grow">
              <main className="mx-auto flex w-full flex-grow flex-col px-4 md:px-10 pt-4 mb-8 items-center">
                <ErrorBoundary defaultFallbackCardClassName="flex flex-col flex-grow justify-center">
                  <Outlet />
                </ErrorBoundary>
              </main>
              <div className="sticky bottom-4 sm:bottom-6 left-4 sm:left-6 w-fit">
                <ReportIssueButton />
              </div>
            </div>
            <div className="mt-8">
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

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 1, // 1 seconds
      retry: false,
    },
  },
});

interface QueryContextProps {
  children: React.ReactNode;
}

export const QueryProvider: React.FunctionComponent<QueryContextProps> = (
  props
) => {
  const { children } = props;

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

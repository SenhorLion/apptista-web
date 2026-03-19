'use client';

import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const CONFIGURATION = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
};

const makeQueryClient = () => {
  return new QueryClient(CONFIGURATION);
};

let browserQueryClient: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

type ReactQueryProviderProps = {
  children: React.ReactNode;
};

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export { ReactQueryProvider };

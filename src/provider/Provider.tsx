'use client';

import ApolloClientProvider from './ApolloClientProvider';

export function Provider({ children }: { children: React.ReactNode }) {
  return <ApolloClientProvider>{children}</ApolloClientProvider>;
}

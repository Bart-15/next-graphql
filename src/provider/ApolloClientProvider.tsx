import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

type ApolloClientProviderProps = {
  children: React.ReactNode;
};

const ApolloClientProvider = ({ children }: ApolloClientProviderProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;

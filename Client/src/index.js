import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import { QueryClient, QueryClientProvider } from 'react-query'
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache } from '@apollo/client'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  request: async operation => {
    operation.setContext({
      fetchOptions: {
        credentials: 'include'
      }
    })
  },
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </QueryClientProvider>,
  document.getElementById('root')
);

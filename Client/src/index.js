import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Store from './store/store'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const link = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin'
});

const client = new ApolloClient({
  link,
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
      <Store>
        <App />
      </Store>
    </ApolloProvider>
  </QueryClientProvider>,
  document.getElementById('root')
);

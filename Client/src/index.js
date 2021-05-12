import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import Store from './store/store'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ApolloProvider } from '@apollo/client/react';
import { onError } from "@apollo/client/link/error";
import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin'
});

const client = new ApolloClient({
  link: from([errorLink, link]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          PaginateMessages: {
            keyArgs: false,
            merge(existing, incoming) {
              if (!incoming) return existing
              if (!existing) return incoming

              const { rows, ...rest } = incoming;

              let result = rest;
              result.rows = [...existing.rows, ...rows];

              return result
            }
          }
        }
      }
    }
  }),
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
      <BrowserRouter>
        <Store>
          <App />
        </Store>
      </BrowserRouter>
    </ApolloProvider>
  </QueryClientProvider>,
  document.getElementById('root')
);

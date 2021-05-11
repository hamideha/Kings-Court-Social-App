import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import Store from './store/store'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { offsetLimitPagination } from "@apollo/client/utilities";

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
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          PaginateMessages: offsetLimitPagination()
          // PaginateMessages: {
          //   keyArgs: false,
          //   merge(existing, incoming) {
          //     console.log(existing, incoming)
          //     if (!incoming) return existing
          //     if (!existing) return incoming // existing will be empty the first time 

          //     const { items, ...rest } = incoming;
          //     let result = rest;

          //     result.items = [...existing.items, ...incoming]; // Merge existing items with the items from incoming
          //     console.log(result)
          //     return result
          //   }
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

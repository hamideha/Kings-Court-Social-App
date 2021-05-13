import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import Store from './store/store'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ApolloProvider } from '@apollo/client/react';
import client from './gql.config'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
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

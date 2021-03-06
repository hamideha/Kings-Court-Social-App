import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloClient, InMemoryCache, split } from '@apollo/client'
// createHttpLink
import { createUploadLink } from 'apollo-upload-client';

export const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
    options: {
        reconnect: true,
        connectionParams: { idtoken: "testToken" }
    }
});

// export const httpLink = createHttpLink({
//     uri: 'http://localhost:4000/graphql',
//     credentials: 'include'
// });

export const httpLink = createUploadLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include'
});

// See split documentation here: https://www.apollographql.com/docs/react/data/subscriptions/#5-authenticate-over-websocket-optional
const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    errorLink.concat(wsLink),
    errorLink.concat(httpLink)
);

const client = new ApolloClient({
    link: link,
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
                            result.rows = Array.isArray(rows) ? [...existing.rows, ...rows] : [rows, ...existing.rows];

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

export default client
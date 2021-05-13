import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from '@apollo/client/link/ws';
import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client'

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
        reconnect: true
    }
});

export const link = createHttpLink({
    uri: '/graphql',
    credentials: 'same-origin'
});

const client = new ApolloClient({
    link: from([wsLink, link, errorLink]),
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    PaginateMessages: {
                        keyArgs: false,
                        merge(existing, incoming) {
                            if (!incoming) return existing
                            if (!existing) return incoming
                            console.log(existing, incoming)
                            const { rows, ...rest } = incoming;

                            let result = rest;
                            result.rows = rows.length === 1 ? [...rows, ...existing.rows] : [...existing.rows, ...rows]
                            // THIS IS A TEMPORARY SOLUTION. Its hardcoded that if the incomingrows is only 1 so essentially a new message, then append it to the beginning of the array. What happens if duringpagination on the last page there is onyl 1 row, then it will be pushed above the previousfetch.

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
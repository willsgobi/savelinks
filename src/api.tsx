import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: 'YOUR-URL-HASURA',
    cache: new InMemoryCache(),
    headers: {
        'x-hasura-admin-secret': `YOUR-HASURA-TOKEN`
    }
});

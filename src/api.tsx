import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: 'https://chief-guinea-16.hasura.app/v1/graphql',
    cache: new InMemoryCache(),
    headers: {
        'x-hasura-admin-secret': `ieHvc8w64D7VhZMhmgkjNbWY05Uq99ojAeZw4pr7gTLaS7inhBkbLV4PU9hR2g6s`
    }
});

import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
    link: createHttpLink({ uri: "/api/graphql" }),
    cache: new InMemoryCache()
})

export default apolloClient;


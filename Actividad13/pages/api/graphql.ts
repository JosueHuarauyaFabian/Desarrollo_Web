import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '../../graphql/schema';
import { resolvers } from '../../graphql/resolvers';
import authMiddleware from '../../graphql/middlewares/authMiddleware';
import allowCors from '../../graphql/middlewares/allowCors';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

const handler = startServerAndCreateNextHandler(server);

export default allowCors(authMiddleware(handler));

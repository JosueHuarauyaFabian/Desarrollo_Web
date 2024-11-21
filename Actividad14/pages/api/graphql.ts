import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from '../../graphql/schema';
import { resolvers } from '../../graphql/resolvers';
import dbConnect from '../../middleware/db-connect';

// Configura CORS
const cors = Cors({
  origin: ['http://localhost:3000'], // Restringe acceso al origen permitido
  methods: ['GET', 'POST', 'OPTIONS'], // Métodos permitidos
});

// Función para manejar middlewares en Next.js
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      resolve(result);
    });
  });
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
});

const handler = startServerAndCreateNextHandler(server);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect(); // Conecta a MongoDB
  await runMiddleware(req, res, cors); // Aplica configuración de CORS
  return handler(req, res);
};

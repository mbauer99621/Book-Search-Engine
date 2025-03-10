import express from 'express';
import path from 'node:path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import db from './config/connection.js';
import { typeDefs } from './schemas/typeDefs.js';
import { resolvers } from './schemas/resolvers.js';
import { authenticateToken } from './utils/auth.ts';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  // Apply Apollo middleware
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        const authHeader = req.headers.authorization;
        const user = authenticateToken(authHeader);
        return { user };
      },
    })
  );

  // Serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Server running at http://localhost:${PORT}/graphql`));
  });
};

startApolloServer();

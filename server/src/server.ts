import express from 'express';
import path from 'node:path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import db from './config/connection.js';
import { typeDefs } from './schemas/typeDefs.js';
import { resolvers } from './schemas/resolvers.js';
import { authenticateToken } from './types/express/services/auth.js';
import { fileURLToPath } from 'node:url';

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

console.log("wqkofkneowkd;elmfv;ekosf;")

const startApolloServer = async () => {
  await server.start();

  // Apply Apollo middleware
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context : authenticateToken as any
    })
  );

  // Serve static assets in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/build')));
  }

 
  await db;
  //db.once('open', () => {
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/graphql`));
    console.log("wqkofkneowkd;elmfv;ekosf;")
 // });
  
};



startApolloServer();

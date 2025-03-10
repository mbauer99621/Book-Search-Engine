import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import Navbar from './components/Navbar';

// Initialize Apollo Client
const client = new ApolloClient({
  uri: '/graphql', // Adjust if your backend is running on a different port
  cache: new InMemoryCache(),
  credentials: 'include', // Ensures cookies are sent with requests if needed
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;

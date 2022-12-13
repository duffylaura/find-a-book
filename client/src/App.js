import React from 'react';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import AppNavbar from './components/Navbar';
import Wildcard from './pages/Wildcard';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <AppNavbar />
            <Routes>
              
              <Route 
              path ="/"
              element={<SearchBooks/>}
              />

              <Route
              path = "/saved"
              element={<SavedBooks/>}
              />

              <Route
              path = "*"
              element={<Wildcard/>}
              />


            </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
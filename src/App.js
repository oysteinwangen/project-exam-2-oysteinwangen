import React from 'react';
import '@fontsource/poppins';
import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from '@chakra-ui/react';
import { colors, config, fonts } from './theme';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getFromStorage } from './components/utilities/storage';
import Landing from './pages/Landing/Landing';
import Browse from './pages/Browse/Browse';
import Details from './pages/Details/Details';
import Cart from './pages/Cart/Cart';
import Checkout from './pages/Checkout/Checkout';
import Nav from './components/layout/Nav';

const theme = extendTheme(
  { colors, config, fonts },
  withDefaultColorScheme({
    colorScheme: 'blue',
  })
);

function App() {
  const loggedIn = getFromStorage('logged_in');
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={loggedIn ? <Navigate to="/browse" replace /> : <Landing />}
          />
          <Route
            path="browse"
            element={
              loggedIn ? (
                <>
                  <Nav />
                  <Browse />
                </>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="cart"
            element={
              loggedIn ? (
                <>
                  <Nav />
                  <Cart />
                </>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="checkout"
            element={
              loggedIn ? (
                <>
                  <Nav />
                  <Checkout />
                </>
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route
            path="/details/:id"
            element={
              <>
                <Nav />
                <Details />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

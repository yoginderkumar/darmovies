import { Suspense, lazy } from 'react';
import styled from 'styled-components';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Layout from './layouts/Layout';
import { colors } from './components/colors';
import { SpinnerIcon } from './components/Icons';

const SearchMovies = lazy(() => import('./pages/SearchMovies'));
const PopularMovies = lazy(() => import('./pages/PopularMovies'));
const DiscoverMovies = lazy(() => import('./pages/DiscoverMovies'));

const AppContainer = styled.div`
  height: 100vh;
  width: 100wv;
`;

const Loader = styled.div`
  height: 100vh;
  width: 100wv;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '', element: <Home /> },
      {
        path: 'search',
        element: (
          <Suspense
            fallback={
              <Loader>
                Loading... <SpinnerIcon color={colors.primary} />
              </Loader>
            }
          >
            <SearchMovies />
          </Suspense>
        ),
      },
      {
        path: '/movies/popular',
        element: (
          <Suspense
            fallback={
              <Loader>
                Loading... <SpinnerIcon color={colors.primary} />
              </Loader>
            }
          >
            <PopularMovies />
          </Suspense>
        ),
      },
      {
        path: '/movies/discover',
        element: (
          <Suspense
            fallback={
              <Loader>
                Loading... <SpinnerIcon color={colors.primary} />
              </Loader>
            }
          >
            <DiscoverMovies />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <AppContainer>
      <RouterProvider router={router} />
    </AppContainer>
  );
}

export default App;

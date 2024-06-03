import apiClient from './api';
import { Movie, MovieProvider } from '../types';
import { endpoints } from './endpoints';

type PaginationPayload = {
  page?: number;
};
type MovieListResponse = {
  page: number;
  results: Array<Movie>;
  total_pages: number;
  total_results: number;
};

export async function getDiscoverMovies({ page = 1 }: PaginationPayload) {
  const { data } = await apiClient.get<MovieListResponse>(
    endpoints.discoverMovies,
    {
      params: {
        page,
        limit: 2,
      },
    }
  );
  return data;
}

export async function getPopularMovies({ page = 1 }: PaginationPayload) {
  const { data } = await apiClient.get<MovieListResponse>(
    endpoints.popularMovies,
    {
      params: {
        page,
      },
    }
  );
  return data;
}

export async function getMoviesForQuery({
  page = 1,
  query,
}: PaginationPayload & { query: string }) {
  const { data } = await apiClient.get<MovieListResponse>(
    endpoints.searchMovies,
    {
      params: {
        page,
        query,
      },
    }
  );
  return data;
}

type MovieProviderResponse = {
  results: Array<MovieProvider>;
};
export async function getMovieProviders() {
  const { data } = await apiClient.get<MovieProviderResponse>(
    endpoints.movieProviders,
    {
      params: {
        watch_region: 'IN',
      },
    }
  );
  return data;
}

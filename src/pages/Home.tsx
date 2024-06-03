import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { genre_ids as genre_mapped } from '../constants';
import { Movie, MovieProvider } from '../types';
import {
  getDiscoverMovies,
  getMovieProviders,
  getPopularMovies,
} from '../services';
import {
  Box,
  Button,
  Inline,
  MovieCard,
  MoviePoster,
  Skeleton,
  Stack,
} from '../components';
import { colors } from '../components/colors';

const Info = styled.div`
  padding: 8px 12px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.1);
  opacity: 1;
  transition: opacity 0.3s ease;
`;

const Title = styled.h5`
  font-size: 16px;
  margin: 0;
  z-index: 1;
`;

const Genre = styled.p`
  font-size: 14px;
  color: #b0b0b0;
  margin: 5px 0;
`;

const SeeAll = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  font-weight: bold;
  color: #1885c8;
`;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.thirdBase};
  padding: 8px 16px;
  border-radius: 8px;
  width: 40%;
`;

const SearchInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  font-size: 16px;
  padding: 8px;

  &::placeholder {
    color: #999;
  }
`;

const ScrollableContainer = styled.div`
  overflow-x: auto;
  -webkit-overflow-scrolling: touch; /* For smooth scrolling on iOS */
  white-space: nowrap;
  padding-bottom: 16px; /* Optional: Add some padding to avoid content cut-off */
`;

const temp_items = [1, 2, 3, 4];

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isApiCalled, setIsApiCalled] = useState<boolean>(false);
  const [discoverMovies, setDiscoverMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [movieProviders, setMovieProviders] = useState<MovieProvider[]>([]);

  const searchQueryRef = useRef<HTMLInputElement>(null);

  const fetchDiscoversData = useCallback(async () => {
    try {
      const { results } = await getDiscoverMovies({ page: 1 });
      setDiscoverMovies(results);
    } catch {
      setDiscoverMovies((prev) => [...prev]);
    }
  }, []);

  const fetchPopularMovies = useCallback(async () => {
    try {
      const { results } = await getPopularMovies({
        page: 1,
      });
      setPopularMovies(results);
    } catch {
      setPopularMovies((prev) => [...prev]);
    }
  }, []);

  const fetchMovieProviders = useCallback(async () => {
    try {
      const { results } = await getMovieProviders();
      setMovieProviders(results);
    } catch {
      setMovieProviders((prev) => [...prev]);
    }
  }, []);

  const fetchAllApis = useCallback(() => {
    fetchDiscoversData();
    fetchPopularMovies();
    fetchMovieProviders();
    setIsLoading(false);
  }, [fetchDiscoversData, fetchPopularMovies, fetchMovieProviders]);

  useEffect(() => {
    if (!isApiCalled) {
      setIsApiCalled(true);
      fetchAllApis();
    }
  }, [isApiCalled, fetchAllApis]);

  return (
    <Stack gap={24} style={{ paddingTop: 24 }}>
      <Inline gap={16}>
        <SearchBarContainer>
          <SearchInput
            type="text"
            ref={searchQueryRef}
            placeholder="Search movies..."
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value?.length) {
                navigate(`/search?q=${e.currentTarget.value}`);
              }
            }}
          />
        </SearchBarContainer>
        <Button
          onClick={() => {
            if (searchQueryRef.current?.value?.length) {
              navigate(`/search?q=${searchQueryRef.current.value}`);
            }
          }}
        >
          Search
        </Button>
      </Inline>
      <Stack gap={16} as="section">
        <Inline alignItems="center" justifyContent="space-between">
          <Box as="h1" style={{ margin: 0, fontSize: 24 }}>
            Discovers
          </Box>
          <SeeAll onClick={() => navigate('/movies/discover')}>See More</SeeAll>
        </Inline>
        <ScrollableContainer>
          <Inline as="ul" gap={20}>
            {isLoading
              ? temp_items.map((i) => (
                  <Box key={i}>
                    <Skeleton as="li" width={460} height={260} />
                  </Box>
                ))
              : discoverMovies.map(
                  ({ title, id, genre_ids, backdrop_path }) => {
                    return (
                      <MovieCard as="li" key={id} width={460} height={260}>
                        <MoviePoster
                          src={`https://image.tmdb.org/t/p/w1280/${backdrop_path}`}
                          alt={title}
                          loading="eager"
                        />
                        <Inline>
                          <Info>
                            <Title>{title}</Title>
                            {genre_ids?.length ? (
                              <Inline gap={4}>
                                {genre_ids.map((id, i) => (
                                  <Genre key={id}>
                                    {genre_mapped[id]}
                                    {i !== genre_ids.length - 1 ? `, ` : ''}
                                  </Genre>
                                ))}
                              </Inline>
                            ) : null}
                          </Info>
                        </Inline>
                      </MovieCard>
                    );
                  }
                )}
          </Inline>
        </ScrollableContainer>
      </Stack>
      <Stack gap={16} as="section">
        <Inline alignItems="center" justifyContent="space-between">
          <Box as="h4" style={{ margin: 0, fontSize: 20 }}>
            Popular Movies
          </Box>
          <SeeAll onClick={() => navigate('/movies/popular')}>See More</SeeAll>
        </Inline>
        <ScrollableContainer>
          <Inline as="ul" gap={16}>
            {popularMovies.map(({ title, id, poster_path }) => (
              <MovieCard as="li" key={id} height={240} width={160}>
                <MoviePoster
                  radius={8}
                  src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                  alt={title}
                  loading="lazy"
                />
              </MovieCard>
            ))}
          </Inline>
        </ScrollableContainer>
      </Stack>
      <Stack gap={16} as="section" style={{ paddingBottom: 48 }}>
        <Box as="h4" style={{ margin: 0, fontSize: 20 }}>
          Movie Providers
        </Box>
        <ScrollableContainer>
          <Inline as="ul" gap={16}>
            {movieProviders.map(({ provider_name, provider_id, logo_path }) => (
              <MovieCard as="li" key={provider_id} height={140} width={140}>
                <MoviePoster
                  radius={8}
                  src={`https://image.tmdb.org/t/p/w500/${logo_path}`}
                  alt={provider_name}
                  loading="lazy"
                />
              </MovieCard>
            ))}
          </Inline>
        </ScrollableContainer>
      </Stack>
    </Stack>
  );
};

export default Home;

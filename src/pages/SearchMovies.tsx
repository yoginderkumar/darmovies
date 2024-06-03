import { useSearchParams } from 'react-router-dom';
import { Box, Inline, MovieCard, MoviePoster, Stack } from '../components';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getMoviesForQuery } from '../services';
import { Movie } from '../types';
import { SpinnerIcon } from '../components/Icons';
import { colors } from '../components/colors';

export default function SearchMovies() {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isApiCalled, setIsApiCalled] = useState<boolean>(false);
  const [totalMoviesCount, setTotalMoviesCount] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const searchQuery: string = useMemo(() => {
    return searchParams.get('q') || '';
  }, [searchParams]);

  const fetchSearchResults = useCallback(
    async (page: number) => {
      try {
        const { results, total_results } = await getMoviesForQuery({
          query: searchQuery,
          page,
        });
        setTotalMoviesCount(total_results);
        setMovies((prev) => (page === 1 ? results : [...prev, ...results]));
      } catch {
        setMovies((prev) => prev);
      }
    },
    [searchQuery]
  );

  useEffect(() => {
    if (!isApiCalled) {
      setIsApiCalled(true);
      fetchSearchResults(1);
    }
  }, [fetchSearchResults, isApiCalled]);

  const observer = useRef<IntersectionObserver>();
  const lastMovieElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isLoadingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          movies.length &&
          movies.length !== totalMoviesCount
        ) {
          setIsLoadingMore(true);
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoadingMore, movies.length, totalMoviesCount]
  );

  useEffect(() => {
    if (isLoadingMore) {
      fetchSearchResults(page).then(() => setIsLoadingMore(false));
    }
  }, [isLoadingMore, fetchSearchResults, page]);

  return (
    <Box style={{ paddingTop: 24 }}>
      <Stack gap={24}>
        <Box as="h4" style={{ margin: 0, paddingTop: 4, fontSize: 20 }}>
          Search results for "{searchQuery}"
        </Box>
        <Inline as="ul" gap={16} style={{ flexWrap: 'wrap' }}>
          {movies.map(({ title, poster_path, id }, index) => {
            if (movies.length === index + 1) {
              return (
                <MovieCard
                  ref={(ref) => lastMovieElementRef(ref)}
                  width={180}
                  height={280}
                  as="li"
                  key={id}
                >
                  <MoviePoster
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                    alt={title}
                  />
                </MovieCard>
              );
            } else {
              return (
                <MovieCard width={180} height={280} as="li" key={id}>
                  <MoviePoster
                    src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                    alt={title}
                  />
                </MovieCard>
              );
            }
          })}
        </Inline>
        {isLoadingMore && (
          <Inline gap={16} alignItems="center">
            <p>Loading more...</p>
            <SpinnerIcon color={colors.primary} />
          </Inline>
        )}
      </Stack>
    </Box>
  );
}

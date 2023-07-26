import { Movie, MoviesResponseWithDetails } from '@src/types/movies';

const checkMovieSatisfiesSearch = (movieTitle: string, query: string) => {
  if (!movieTitle || !query) {
    return false;
  }

  return movieTitle.toLowerCase().trim().includes(query.toLowerCase().trim());
};

const getMoviesWithBriefDetails = (movies: MoviesResponseWithDetails) =>
  movies.map((movie) => {
    const { Images, imdbID, Poster, Title } = movie;
    return {
      Images,
      imdbID,
      Poster,
      Title,
    } as Movie;
  });

export const getFilteredMovies = (
  movies: MoviesResponseWithDetails,
  query: string | null,
) => {
  if (!query) {
    return getMoviesWithBriefDetails(movies);
  }

  const filteredMovies = movies.filter((movie) =>
    checkMovieSatisfiesSearch(movie.Title, query),
  );
  return getMoviesWithBriefDetails(filteredMovies);
};

export const getMovieDetails = (
  movies: MoviesResponseWithDetails,
  movieId: string,
) => {
  return movies.find((movie) => movie.imdbID === movieId);
};

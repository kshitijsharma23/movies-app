import moviesResponse from '@mocks/moviesResponse.json';

import { Movie, MoviesResponseWithDetails } from '@src/types/movies';

const checkMovieSatisfiesSearch = (movieTitle: string, query: string) => {
  if (!movieTitle || !query) {
    return false;
  }

  return (
    movieTitle.toLowerCase().trim().indexOf(query.toLowerCase().trim()) >= 0
  );
};

export const getFilteredMovies = (query: string | null) => {
  if (!query) {
    return moviesResponse;
  }

  return (moviesResponse as MoviesResponseWithDetails)
    .filter((movie) => checkMovieSatisfiesSearch(movie.Title, query))
    .map((movie) => {
      const { Images, imdbID, Poster, Title } = movie;
      return {
        Images,
        imdbID,
        Poster,
        Title,
      } as Movie;
    });
};

export const getMovieDetails = (movieId: string) => {
  return (moviesResponse as MoviesResponseWithDetails).find(
    (movie) => movie.imdbID === movieId,
  );
};

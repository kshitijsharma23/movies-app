import { rest } from 'msw';

import { ApiKeys, ApiUrls, baseUrl } from '@constants/apiConstants';

import { getFilteredMovies, getMovieDetails } from '@utils/mockUtils';

import moviesResponse from '../__mocks__/moviesResponse.json';

export const movieHandlers = [
  rest.get(`${baseUrl}${ApiUrls[ApiKeys.MOVIES_LIST]}`, (req, res, ctx) => {
    const query = req.url.searchParams.get('query');
    const responseData = getFilteredMovies(moviesResponse, query);
    return res(ctx.status(200), ctx.delay(1000), ctx.json(responseData));
  }),
  rest.get(
    `${baseUrl}${ApiUrls[ApiKeys.MOVIES_LIST]}/:movieId`,
    (req, res, ctx) => {
      const movieIdParam = req.params.movieId;
      const movieId =
        typeof movieIdParam === 'string' ? movieIdParam : movieIdParam[0];
      const responseData = getMovieDetails(moviesResponse, movieId);

      if (!responseData) {
        return res(ctx.status(404), ctx.json({ message: 'Movie not found!' }));
      }

      return res(ctx.status(200), ctx.delay(1000), ctx.json(responseData));
    },
  ),
];

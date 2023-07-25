import { rest } from 'msw';

import { ApiUrls, baseUrl } from '@constants/apiConstants';

import { getFilteredMovies, getMovieDetails } from '@src/utils/mockUtils';

export const movieHandlers = [
  rest.get(`${baseUrl}${ApiUrls.MOVIES_LIST}`, (req, res, ctx) => {
    const query = req.url.searchParams.get('query');
    const responseData = getFilteredMovies(query);
    return res(ctx.status(200), ctx.delay(1000), ctx.json(responseData));
  }),
  rest.get(`${baseUrl}${ApiUrls.MOVIES_LIST}/:movieId`, (req, res, ctx) => {
    const movieId = req.params.movieId;
    const responseData =
      typeof movieId === 'string'
        ? getMovieDetails(movieId)
        : getMovieDetails(movieId[0]);

    if (!responseData) {
      return res(ctx.status(404), ctx.json({ message: 'Movie not found!' }));
    }

    return res(ctx.status(200), ctx.delay(1000), ctx.json(responseData));
  }),
];

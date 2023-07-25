import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiCaller, GetApiUrlParams, getApiUrl } from '@src/utils/apiUtils';

import { ApiUrls } from '@constants/apiConstants';
import { MovieDetails, MoviesResponse } from '@src/types/movies';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (query?: string | null) => {
    const apiParams: GetApiUrlParams = {
      url: ApiUrls.MOVIES_LIST,
    };

    if (query) {
      apiParams.queryParams = {
        query,
      };
    }

    const url = getApiUrl(apiParams);
    const response = await apiCaller<MoviesResponse>({ url });
    return response;
  },
);

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (id: string) => {
    const url = getApiUrl({
      url: ApiUrls.MOVIE_DETAILS,
      requestParams: { id },
    });
    const response = await apiCaller<MovieDetails>({ url });
    return response;
  },
);

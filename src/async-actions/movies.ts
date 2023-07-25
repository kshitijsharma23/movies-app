import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiCaller, ApiCallerParams } from '@utils/apiUtils';

import { ApiKeys } from '@constants/apiConstants';

import { MovieDetails, MoviesResponse } from '@src/types/movies';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (query?: string | null) => {
    const apiParams: ApiCallerParams = {
      apiKey: ApiKeys.MOVIES_LIST,
    };

    if (query) {
      apiParams.queryParams = {
        query,
      };
    }

    const response = (await apiCaller<MoviesResponse>(
      apiParams,
    )) as MoviesResponse;
    return response;
  },
);

export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (id: string) => {
    const response = (await apiCaller<MovieDetails>({
      apiKey: ApiKeys.MOVIE_DETAILS,
      requestParams: { id },
    })) as MovieDetails;
    return response;
  },
);

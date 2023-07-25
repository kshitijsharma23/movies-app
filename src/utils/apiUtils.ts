import { baseUrl, ApiUrls, ApiKeys } from '@constants/apiConstants';

import { ErrorResponse } from '@src/types';
import { MoviesResponseWithDetails } from '@src/types/movies';
import { Profile } from '@src/types/profile';

import { getFilteredMovies, getMovieDetails } from './mockUtils';

enum ApiMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface ApiCallerParams {
  apiKey: ApiKeys;
  method?: ApiMethod;
  queryParams?: Record<string, string | number>;
  requestParams?: Record<string, string | number>;
}

export interface GetApiUrlParams {
  url: string;
  queryParams?: Record<string, string | number>;
  requestParams?: Record<string, string | number>;
}

interface GetMockDataParams {
  response: unknown;
  queryParams?: Record<string, string | number>;
  requestParams?: Record<string, string | number>;
}

const USE_MOCKS = process.env.NODE_ENV === 'production';

const ApiMocks = {
  [ApiKeys.MOVIES_LIST]: {
    url: '../mocks/moviesResponse.json',
    getData: ({ response, queryParams }: GetMockDataParams) => {
      const query = queryParams?.['query'];
      return getFilteredMovies(
        response as MoviesResponseWithDetails,
        query ? `${query}` : null,
      );
    },
  },
  [ApiKeys.MOVIE_DETAILS]: {
    url: '../mocks/moviesResponse.json',
    getData: ({ response, requestParams }: GetMockDataParams) => {
      const movieId = requestParams?.['id'];

      if (movieId) {
        return getMovieDetails(
          response as MoviesResponseWithDetails,
          `${movieId}`,
        );
      }
    },
  },
  [ApiKeys.PROFILE]: {
    url: '../mocks/profileResponse.json',
    getData: ({ response }: GetMockDataParams) => {
      return response as Profile;
    },
  },
};

export const getApiUrl = ({
  url,
  queryParams,
  requestParams,
}: GetApiUrlParams) => {
  let apiUrl: string = url;

  if (requestParams) {
    apiUrl = Object.entries(requestParams).reduce((acc, [key, value]) => {
      const newPath = acc.replace(`{${key}}`, `${value}`);
      return newPath;
    }, url as string);
  }

  if (queryParams) {
    const queryParamsString = Object.entries(queryParams).reduce(
      (acc, [key, value]) => {
        const paramString = `${key}=${value}`;
        if (acc) {
          return `${acc}&${paramString}`;
        }
        return `?${paramString}`;
      },
      '',
    );

    apiUrl = `${apiUrl}${queryParamsString}`;
  }

  return `${baseUrl}${apiUrl}`;
};

export const apiCaller = async <T = unknown>({
  apiKey,
  method = ApiMethod.GET,
  queryParams,
  requestParams,
}: ApiCallerParams) => {
  if (USE_MOCKS) {
    const { url, getData } = ApiMocks[apiKey];
    const res = (await import(url)) as { default: unknown };
    console.log(res);
    const response = res.default;
    return getData({ response, queryParams, requestParams });
  } else {
    try {
      const url = ApiUrls[apiKey];
      const apiUrl = getApiUrl({ url, queryParams, requestParams });
      const res = await fetch(apiUrl, { method });

      if (!res.ok) {
        const error = (await res.json()) as ErrorResponse;
        throw new Error(error.message);
      } else {
        const response = (await res.json()) as T;
        return response;
      }
    } catch (error: unknown) {
      throw new Error((error as ErrorResponse)?.message);
    }
  }
};

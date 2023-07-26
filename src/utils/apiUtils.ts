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

const isProductionEnv = process.env.NODE_ENV === 'production';
const USE_MOCKS = isProductionEnv;
const mockDirectory = isProductionEnv
  ? import.meta.env.BASE_URL
  : '../mocks/__mocks__';

const ApiMocks = {
  [ApiKeys.MOVIES_LIST]: {
    url: `${mockDirectory}/moviesResponse.json`,
    getData: ({ response, queryParams }: GetMockDataParams) => {
      const query = queryParams?.query;
      return getFilteredMovies(
        response as MoviesResponseWithDetails,
        query ? `${query}` : null,
      );
    },
    timeout: 1000,
  },
  [ApiKeys.MOVIE_DETAILS]: {
    url: `${mockDirectory}/moviesResponse.json`,
    getData: ({ response, requestParams }: GetMockDataParams) => {
      const movieId = requestParams?.id;

      if (movieId) {
        return getMovieDetails(
          response as MoviesResponseWithDetails,
          `${movieId}`,
        );
      }
    },
    timeout: 1000,
  },
  [ApiKeys.PROFILE]: {
    url: `${mockDirectory}/profileResponse.json`,
    getData: ({ response }: GetMockDataParams) => {
      return response as Profile;
    },
    timeout: 500,
  },
};

const delay = async (timeout: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
};

const fetchMock = async (url: string) => {
  if (isProductionEnv) {
    const res = await fetch(url);
    const response = (await res.json()) as unknown;
    return response;
  }
  const res = (await import(/* @vite-ignore */ url)) as { default: unknown };
  return res.default;
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
    }, url);
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
    const { url, getData, timeout } = ApiMocks[apiKey];
    const response = await fetchMock(url);
    await delay(timeout);
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
      throw new Error((error as ErrorResponse).message);
    }
  }
};

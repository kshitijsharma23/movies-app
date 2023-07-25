import { baseUrl, ApiUrls } from '@constants/apiConstants';

import { ErrorResponse } from '@src/types';

enum ApiMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface ApiCallerParams {
  url: string;
  method?: ApiMethod;
}

export interface GetApiUrlParams {
  url: ApiUrls;
  queryParams?: Record<string, string | number>;
  requestParams?: Record<string, string | number>;
}

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
  url,
  method = ApiMethod.GET,
}: ApiCallerParams) => {
  try {
    const res = await fetch(url, { method });

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
};

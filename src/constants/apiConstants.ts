const { host, protocol } = window.location;
export const baseUrl = `${protocol}//${host}`;

export enum ApiKeys {
  MOVIES_LIST = 'MOVIES_LIST',
  MOVIE_DETAILS = 'MOVIE_DETAILS',
  PROFILE = 'PROFILE',
}

export const ApiUrls = {
  [ApiKeys.MOVIES_LIST]: '/movies',
  [ApiKeys.MOVIE_DETAILS]: '/movies/{id}',
  [ApiKeys.PROFILE]: '/profile',
};

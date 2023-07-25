const { host, protocol } = window.location;
export const baseUrl = `${protocol}//${host}`;

export enum ApiUrls {
  MOVIES_LIST = '/movies',
  MOVIE_DETAILS = '/movies/{id}',
  PROFILE = '/profile',
}

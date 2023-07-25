export interface Movie {
  Images: Array<string>;
  imdbID: string;
  Poster: string;
  Title: string;
}

export interface MovieDetails extends Movie {
  Actors: string;
  Awards: string;
  Country: string;
  Director: string;
  Genre: string;
  imdbRating: string;
  imdbVotes: string;
  Language: string;
  Metascore: string;
  Plot: string;
  Rated: string;
  Released: string;
  Response: string;
  Runtime: string;
  Type: string;
  Writer: string;
  Year: string;
}

export type MoviesResponse = Array<Movie>;

export type MoviesResponseWithDetails = Array<MovieDetails>;

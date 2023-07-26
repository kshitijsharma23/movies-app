import { FC, PropsWithChildren } from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { useAppSelector } from '@hooks/useAppSelector';

import { selectMovies } from '@reducers/moviesSlice';

import KeyValueList from '@components/KeyValueList';
import Loader from '@components/Loader';
import Ratings from '@components/Ratings';

import styles from './MovieDetails.module.scss';

interface MovieDetailsProps {
  maxWidth: string;
}

const MovieDetailsWrapper: FC<PropsWithChildren<MovieDetailsProps>> = (
  props,
) => {
  const { children, maxWidth } = props;

  return (
    <Grid item xs={12}>
      <div className={styles['movie-details']} style={{ maxWidth }}>
        {children}
      </div>
    </Grid>
  );
};

const MovieDetails: FC<MovieDetailsProps> = (props) => {
  const { maxWidth } = props;
  const { selectedMovieDetails } = useAppSelector(selectMovies);
  const { data, loading } = selectedMovieDetails;

  if (loading) {
    return (
      <MovieDetailsWrapper maxWidth={maxWidth}>
        <Loader />
      </MovieDetailsWrapper>
    );
  }

  if (!data) {
    return null;
  }

  const {
    Director: director,
    imdbRating,
    Language: language,
    Plot: plot,
    Poster: poster,
    Runtime: runtime,
    Title: title,
    Year: year,
  } = data;

  const keyValueData = {
    Year: year,
    'Running Time': runtime,
    'Directed By': director,
    Language: language,
  };

  return (
    <MovieDetailsWrapper maxWidth={maxWidth}>
      <div className={styles['movie-poster-wrapper']}>
        <img className={styles['movie-poster']} src={poster} />
      </div>
      <div className={styles['details-container']}>
        <div className={styles.title}>{title}</div>
        <Ratings ratings={imdbRating} />
        <KeyValueList keyValuePairs={keyValueData} />
        <div className={styles.plot}>{plot}</div>
        <div className={styles['buttons-container']}>
          <Button variant="contained">Play Movie</Button>
          <Button variant="outlined">Watch Trailer</Button>
        </div>
      </div>
    </MovieDetailsWrapper>
  );
};

export default MovieDetails;

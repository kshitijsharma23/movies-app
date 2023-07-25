import { FC, Fragment, useState } from 'react';

import Grid from '@mui/material/Grid';

import { useAppSelector } from '@hooks/useAppSelector';

import { selectMovies } from '@reducers/moviesSlice';

import Loader from '@components/Loader';
import MovieCard from '@components/MovieCard/MovieCard';
import MovieDetails from '@components/MovieDetails/MovieDetails';

import { MovieDetailsLayout } from '@src/types/layout';

const MoviesList: FC = () => {
  const [indexToInsertDetails, setIndexToInsertDetails] = useState<
    number | null
  >(null);
  const [movieDetailsMaxWidth, setMovieDetailsMaxWidth] = useState('100%');
  const { moviesList } = useAppSelector(selectMovies);

  const { data, loading } = moviesList;

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return null;
  }

  const handleMovieCardClick = (
    movieDetailsLayout: MovieDetailsLayout | null,
  ) => {
    const { indexToInsert = null, maxWidth = '100%' } =
      movieDetailsLayout || {};
    setIndexToInsertDetails(indexToInsert);
    setMovieDetailsMaxWidth(maxWidth);
  };

  return (
    <Grid container columnSpacing={3} rowSpacing={4}>
      {data.map((movie, index) => (
        <Fragment key={movie.imdbID}>
          {indexToInsertDetails === index ? (
            <MovieDetails maxWidth={movieDetailsMaxWidth} />
          ) : null}
          <Grid item xs="auto">
            <MovieCard
              cardIndex={index}
              movie={movie}
              onMovieCardClick={handleMovieCardClick}
            />
          </Grid>
        </Fragment>
      ))}
    </Grid>
  );
};

export default MoviesList;

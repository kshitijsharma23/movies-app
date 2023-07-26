import { FC, MouseEventHandler } from 'react';
import cx from 'classnames';

import IconButton from '@mui/material/IconButton';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import { useAppDispatch } from '@hooks/useAppDispatch';

import {
  resetSelectedMovieDetails,
  selectMovies,
  setSelectedMovieId,
} from '@reducers/moviesSlice';

import { fetchMovieById } from '@async-actions/movies';

import { Movie } from '@src/types/movies';

import styles from './MovieCard.module.scss';
import { useAppSelector } from '@hooks/useAppSelector';
import { getMovieDetailsLayout } from '@src/utils/layoutUtils';
import { MovieDetailsLayout } from '@src/types/layout';

interface MovieCardProps {
  cardIndex: number;
  movie: Movie;
  onMovieCardClick: (movieDetailsLayout: MovieDetailsLayout | null) => void;
}

const MovieCard: FC<MovieCardProps> = (props) => {
  const { cardIndex, movie, onMovieCardClick } = props;
  const { imdbID, Poster: poster, Title: title } = movie;
  const dispatch = useAppDispatch();
  const { selectedMovieId } = useAppSelector(selectMovies);
  const isSelected = imdbID === selectedMovieId;

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    if (isSelected) {
      dispatch(setSelectedMovieId(null));
      dispatch(resetSelectedMovieDetails());
      onMovieCardClick(null);
    } else {
      dispatch(setSelectedMovieId(imdbID));
      void dispatch(fetchMovieById(imdbID));

      const containerWidth = (
        event.currentTarget.parentNode?.parentNode as HTMLDivElement | undefined
      )?.clientWidth;

      const movieDetailsLayout = getMovieDetailsLayout(
        cardIndex,
        containerWidth,
      );
      onMovieCardClick(movieDetailsLayout);
    }
  };

  return (
    <div
      className={cx(styles['movie-card'], {
        [styles.selected]: isSelected,
      })}
      onClick={handleClick}
      role="button"
    >
      <div className={styles['movie-poster-wrapper']}>
        <img className={styles['movie-poster']} src={poster} />
      </div>
      <div className={styles['movie-title']}>{title}</div>
      <div className={styles['movie-actions']}>
        <IconButton>
          <PlayCircleOutlineIcon />
        </IconButton>
        <IconButton>
          <AddCircleOutlineIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default MovieCard;

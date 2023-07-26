import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '@hooks/useAppDispatch';

import { fetchMovies } from '@async-actions/movies';

import MoviesList from '@components/MoviesList';

import { setSearchEnabled, setSearchQueryParam } from '@reducers/commonSlice';

import { discoverSearchQueryParam } from '@constants/discoverConstants';

const Discover: FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(setSearchEnabled(true));
    dispatch(setSearchQueryParam(discoverSearchQueryParam));

    return () => {
      dispatch(setSearchEnabled(false));
      dispatch(setSearchQueryParam(null));
    };
  }, [dispatch]);

  useEffect(() => {
    void dispatch(fetchMovies(searchParams.get(discoverSearchQueryParam)));
  }, [dispatch, searchParams]);

  return <MoviesList />;
};

export default Discover;

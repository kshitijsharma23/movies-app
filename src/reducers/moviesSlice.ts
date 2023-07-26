import { Action, createSlice } from '@reduxjs/toolkit';

import { fetchMovieById, fetchMovies } from '@async-actions/movies';

import { MovieDetails, MoviesResponse } from '@src/types/movies';
import { ApiData, ErrorResponse } from '@src/types';
import { RootState } from '@src/store';

interface MoviesState {
  moviesList: ApiData<MoviesResponse>;
  selectedMovieId: string | null;
  selectedMovieDetails: ApiData<MovieDetails>;
}

interface SetMoviesAction extends Action<string> {
  payload: MoviesResponse | undefined;
}

interface SetSelectedMovieDetailsAction extends Action<string> {
  payload: MovieDetails | undefined;
}

interface SetSelectedMovieIdAction extends Action<string> {
  payload: string | null;
}

const initialState: MoviesState = {
  moviesList: {
    data: null,
    loading: false,
    hasError: false,
    error: null,
  },
  selectedMovieId: null,
  selectedMovieDetails: {
    data: null,
    loading: false,
    hasError: false,
    error: null,
  },
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setSelectedMovieId: (state, action: SetSelectedMovieIdAction) => {
      state.selectedMovieId = action.payload;
    },
    resetSelectedMovieDetails: (state) => {
      state.selectedMovieDetails.data = null;
      state.selectedMovieDetails.error = null;
      state.selectedMovieDetails.hasError = false;
      state.selectedMovieDetails.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action: SetMoviesAction) => {
      state.moviesList.data = action.payload ?? null;
      state.moviesList.error = null;
      state.moviesList.hasError = false;
      state.moviesList.loading = false;
    });

    builder.addCase(fetchMovies.pending, (state) => {
      state.moviesList.error = null;
      state.moviesList.hasError = false;
      state.moviesList.loading = true;
    });

    builder.addCase(fetchMovies.rejected, (state, action) => {
      console.log(action.payload);
      state.moviesList.data = null;
      state.moviesList.hasError = true;
      state.moviesList.loading = false;
    });

    builder.addCase(
      fetchMovieById.fulfilled,
      (state, action: SetSelectedMovieDetailsAction) => {
        state.selectedMovieDetails.data = action.payload ?? null;
        state.selectedMovieDetails.error = null;
        state.selectedMovieDetails.hasError = false;
        state.selectedMovieDetails.loading = false;
      },
    );

    builder.addCase(fetchMovieById.pending, (state) => {
      state.selectedMovieDetails.error = null;
      state.selectedMovieDetails.hasError = false;
      state.selectedMovieDetails.loading = true;
    });

    builder.addCase(fetchMovieById.rejected, (state, action) => {
      state.selectedMovieDetails.error =
        (action.error as unknown as ErrorResponse).message || null;
      state.selectedMovieDetails.data = null;
      state.selectedMovieDetails.hasError = true;
      state.selectedMovieDetails.loading = false;
    });
  },
});

export const { resetSelectedMovieDetails, setSelectedMovieId } =
  moviesSlice.actions;

export const selectMovies = (state: RootState) => state.movies;

export default moviesSlice.reducer;

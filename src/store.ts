import { configureStore } from '@reduxjs/toolkit';

import commonReducer from '@reducers/commonSlice';
import moviesReducer from '@reducers/moviesSlice';
import profileReducer from '@reducers/profileSlice';

export const store = configureStore({
  reducer: {
    common: commonReducer,
    movies: moviesReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

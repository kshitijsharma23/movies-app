import { fetchUserProfile } from '@async-actions/profile';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@src/store';

import { ApiData } from '@src/types';
import { Profile } from '@src/types/profile';

interface ProfileState {
  userProfile: ApiData<Profile>;
}

const initialState: ProfileState = {
  userProfile: {
    data: null,
    error: null,
    hasError: false,
    loading: false,
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.userProfile.data = action.payload;
      state.userProfile.error = null;
      state.userProfile.hasError = false;
      state.userProfile.loading = false;
    });

    builder.addCase(fetchUserProfile.pending, (state) => {
      state.userProfile.error = null;
      state.userProfile.hasError = false;
      state.userProfile.loading = true;
    });

    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.userProfile.data = null;
      state.userProfile.error = action.error.message ?? null;
      state.userProfile.hasError = true;
      state.userProfile.loading = false;
    });
  },
});

export const selectUserProfile = (state: RootState) =>
  state.profile.userProfile;

export default profileSlice.reducer;

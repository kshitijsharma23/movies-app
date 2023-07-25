import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiCaller } from '@utils/apiUtils';

import { ApiKeys } from '@constants/apiConstants';

import { Profile } from '@src/types/profile';

export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async () => {
    const response = apiCaller<Profile>({
      apiKey: ApiKeys.PROFILE,
    }) as unknown as Profile;
    return response;
  },
);

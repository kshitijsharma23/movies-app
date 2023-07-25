import { createAsyncThunk } from '@reduxjs/toolkit';

import { apiCaller, getApiUrl } from '@utils/apiUtils';

import { ApiUrls } from '@constants/apiConstants';
import { Profile } from '@src/types/profile';

export const fetchUserProfile = createAsyncThunk(
  'profile/fetchUserProfile',
  async () => {
    const url = getApiUrl({ url: ApiUrls.PROFILE });
    const response = apiCaller<Profile>({ url });
    return response;
  },
);

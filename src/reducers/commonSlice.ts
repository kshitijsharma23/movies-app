import { Action, createSlice } from '@reduxjs/toolkit';

import { RootState } from '@src/store';

interface CommonState {
  searchEnabled: boolean;
  searchQueryParam: string | null;
}

interface SetSearchEnabledAction extends Action<string> {
  payload: boolean;
}

interface SetSearchQueryParamAction extends Action<string> {
  payload: string | null;
}

const initialState: CommonState = {
  searchEnabled: false,
  searchQueryParam: null,
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setSearchEnabled: (state, action: SetSearchEnabledAction) => {
      state.searchEnabled = action.payload;
    },
    setSearchQueryParam: (state, action: SetSearchQueryParamAction) => {
      state.searchQueryParam = action.payload;
    },
  },
});

export const { setSearchEnabled, setSearchQueryParam } = commonSlice.actions;

export const selectSearch = (state: RootState) => {
  const { searchEnabled, searchQueryParam } = state.common;
  return { searchEnabled, searchQueryParam };
};

export default commonSlice.reducer;

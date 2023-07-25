import { Theme } from '@constants/index';
import { ThemeAction, ThemeState } from '@src/types';

const themeReducer = (state: ThemeState, action: ThemeAction) => {
  switch (action.type) {
    case Theme.DARK:
      return { theme: Theme.DARK };
    case Theme.LIGHT:
      return { theme: Theme.LIGHT };
    default:
      return state;
  }
};

export default themeReducer;

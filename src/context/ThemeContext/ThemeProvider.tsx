import { FC, PropsWithChildren, useEffect, useReducer } from 'react';

import ThemeContext from './ThemeContext';
import themeReducer from './themeReducer';

import { Theme } from '@src/constants';

const INITIAL_STATE = {
  theme: Theme.DARK,
};

const ThemeProvider: FC<PropsWithChildren<unknown>> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(themeReducer, INITIAL_STATE);

  useEffect(() => {
    document.body.dataset.theme = INITIAL_STATE.theme;
  }, []);

  const setTheme = (theme: Theme) => {
    dispatch({ type: theme });
    document.body.dataset.theme = theme;
  };

  const value = {
    theme: state.theme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;

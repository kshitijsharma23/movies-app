import { createContext } from 'react';

import { Theme } from '@constants/index';

const ThemeContext = createContext({
  theme: Theme.DARK,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTheme: (_theme: Theme) => {},
});

export default ThemeContext;

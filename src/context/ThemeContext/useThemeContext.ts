import { useContext } from 'react';

import ThemeContext from './ThemeContext';

const useThemeContext = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return {
    theme,
    setTheme,
  };
};

export default useThemeContext;

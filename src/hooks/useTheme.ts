import { useContext, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

import ThemeContext from '@context/ThemeContext';

// import { getColorValue } from '@utils/styleUtils';
import { colors } from '@constants/colorConstants';

const useTheme = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  console.log('theme', theme);

  // const muiTheme = useMemo(
  //   () =>
  //     createTheme({
  //       palette: {
  //         mode: theme,
  //         background: {
  //           default: getColorValue('--color-bg-primary'),
  //           paper: getColorValue('--color-bg-navbar'),
  //         },
  //         primary: {
  //           main: getColorValue('--color-accent-primary'),
  //         },
  //         text: {
  //           primary: getColorValue('--color-text-primary'),
  //           secondary: getColorValue('--color-text-secondary'),
  //         },
  //       },
  //     }),
  //   [theme],
  // );

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
          background: {
            default: colors[theme]['--color-bg-primary'],
            paper: colors[theme]['--color-bg-navbar'],
          },
          primary: {
            main: colors[theme]['--color-accent-primary'],
          },
          text: {
            primary: colors[theme]['--color-text-primary'],
            secondary: colors[theme]['--color-text-secondary'],
          },
        },
      }),
    [theme],
  );

  return {
    muiTheme,
    setTheme,
    theme,
  };
};

export default useTheme;

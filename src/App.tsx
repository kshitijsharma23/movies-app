import { useEffect } from 'react';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { useAppDispatch } from '@hooks/useAppDispatch';
import useTheme from '@hooks/useTheme';

import { fetchUserProfile } from '@async-actions/profile';

import Header from '@components/Header/Header';
import Sidebar from '@components/Sidebar';

import AppRouter from './AppRouter';

import './App.scss';

function App() {
  const dispatch = useAppDispatch();
  const { muiTheme } = useTheme();

  // console.log(muiTheme);
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flex: 1,
            p: 5,
            width: { sm: `calc(100% - var(--sidebar-width))` },
          }}
        >
          <Header />
          <AppRouter />
        </Box>
      </Box>
    </MuiThemeProvider>
  );
}

export default App;

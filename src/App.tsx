import { useEffect, useState } from 'react';

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { muiTheme } = useTheme();

  useEffect(() => {
    void dispatch(fetchUserProfile());
  }, [dispatch]);

  const handleDrawerToggle = () => {
    setMobileOpen((prevMobileOpen) => !prevMobileOpen);
  };

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Sidebar
          handleDrawerToggle={handleDrawerToggle}
          mobileOpen={mobileOpen}
        />
        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 2, md: 5 },
            width: { md: `calc(100% - var(--sidebar-width))` },
          }}
        >
          <Header handleDrawerToggle={handleDrawerToggle} />
          <AppRouter />
        </Box>
      </Box>
    </MuiThemeProvider>
  );
}

export default App;

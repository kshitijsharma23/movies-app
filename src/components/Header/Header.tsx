import { FC } from 'react';

import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';

import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import Search from '@components/Search';
import ThemeToggle from '@components/ThemeToggle';

import styles from './Header.module.scss';

interface HeaderProps {
  handleDrawerToggle: () => void;
}

const CustomToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: 40,
  '&[class*="MuiToolbar-root"]': {
    padding: 0,
  },
}));

const Header: FC<HeaderProps> = (props) => {
  const { handleDrawerToggle } = props;

  return (
    <CustomToolbar>
      <div className={styles['header-left-column']}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 1, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Search />
      </div>

      <div>
        <ThemeToggle />
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </div>
    </CustomToolbar>
  );
};

export default Header;

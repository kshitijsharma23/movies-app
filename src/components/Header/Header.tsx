import { FC } from 'react';

import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import Search from '@components/Search';
import ThemeToggle from '@components/ThemeToggle';

const CustomToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: 40,
  '&[class*="MuiToolbar-root"]': {
    padding: 0,
  },
}));

const Header: FC = () => {
  return (
    <CustomToolbar>
      <Search />
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

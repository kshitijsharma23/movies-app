import { FC } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

import {
  sidebarL1Items,
  sidebarL2Items,
  sidebarL3Items,
} from '@constants/sidebarConstants';

import NavList from './NavList';
import UserInfo from '@components/UserInfo/UserInfo';

interface SidebarProps {
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
}

const DrawerContent: FC = () => {
  return (
    <div>
      <Toolbar>
        <UserInfo />
      </Toolbar>
      <Divider />
      <NavList navItems={sidebarL1Items} />
      <Divider />
      <NavList navItems={sidebarL2Items} />
      <Divider />
      <NavList navItems={sidebarL3Items} />
    </div>
  );
};

const Sidebar: FC<SidebarProps> = (props) => {
  const { handleDrawerToggle, mobileOpen } = props;

  return (
    <Box
      component="nav"
      sx={{
        width: { md: 'var(--sidebar-width)' },
        flexShrink: { md: 0 },
      }}
    >
      <Drawer
        container={document.body}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 'var(--sidebar-width)',
          },
        }}
      >
        <DrawerContent />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 'var(--sidebar-width)',
          },
        }}
        open
      >
        <DrawerContent />
      </Drawer>
    </Box>
  );
};

export default Sidebar;

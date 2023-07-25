import { FC } from 'react';
import List from '@mui/material/List';

import { NavItem as NavItemProps } from '@src/types/sidebar';

import NavItem from './NavItem';

interface NavListProps {
  navItems: Array<NavItemProps>;
}

const NavList: FC<NavListProps> = (props) => {
  const { navItems } = props;

  if (!navItems || !navItems.length) {
    return null;
  }

  return (
    <List>
      {navItems.map((navItem) => {
        const { icon, route, title } = navItem;
        return <NavItem key={route} icon={icon} route={route} title={title} />;
      })}
    </List>
  );
};

export default NavList;

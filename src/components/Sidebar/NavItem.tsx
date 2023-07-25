import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { NavItem as NavItemProps } from '@src/types/sidebar';
import { styled } from '@mui/material/styles';

interface NavListItemProps {
  isActive: boolean;
}

const NavListItem = styled(ListItem)(({ isActive }: NavListItemProps) => ({
  padding: 0,
  borderRight: isActive ? '3px solid var(--color-accent-primary)' : 'none',
}));

const NavItem: FC<NavItemProps> = (props) => {
  const { icon, route, title } = props;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive =
    route === '/' ? pathname === '/' : pathname.startsWith(route);
  const color = isActive ? 'var(--color-accent-primary)' : 'inherit';

  const handleClick = () => {
    navigate(route);
  };

  return (
    <NavListItem isActive={isActive}>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon color={color}>{icon(isActive)}</ListItemIcon>
        <ListItemText
          primary={title}
          primaryTypographyProps={{
            color,
          }}
        />
      </ListItemButton>
    </NavListItem>
  );
};

export default NavItem;

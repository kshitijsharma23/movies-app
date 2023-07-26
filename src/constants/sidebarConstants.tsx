import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ListIcon from '@mui/icons-material/List';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import LogoutIcon from '@mui/icons-material/Logout';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import TvIcon from '@mui/icons-material/Tv';
import UpdateIcon from '@mui/icons-material/Update';

import { NavItem } from '@src/types/sidebar';
import { AppRoutes } from '.';

export const sidebarL1Items: NavItem[] = [
  {
    title: 'Discover',
    route: AppRoutes.DISCOVER,
    icon: (isActive) => <SearchIcon color={isActive ? 'primary' : 'inherit'} />,
  },
  {
    title: 'Playlist',
    route: AppRoutes.PLAYLIST,
    icon: (isActive) => (
      <PlaylistPlayIcon color={isActive ? 'primary' : 'inherit'} />
    ),
  },
  {
    title: 'Movie',
    route: AppRoutes.MOVIE,
    icon: (isActive) => <LiveTvIcon color={isActive ? 'primary' : 'inherit'} />,
  },
  {
    title: 'TV Shows',
    route: AppRoutes.TV_SHOWS,
    icon: (isActive) => <TvIcon color={isActive ? 'primary' : 'inherit'} />,
  },
  {
    title: 'My List',
    route: AppRoutes.MY_LIST,
    icon: (isActive) => <ListIcon color={isActive ? 'primary' : 'inherit'} />,
  },
];

export const sidebarL2Items: NavItem[] = [
  {
    title: 'Watch Later',
    route: AppRoutes.WATCH_LATER,
    icon: (isActive) => <UpdateIcon color={isActive ? 'primary' : 'inherit'} />,
  },
  {
    title: 'Recomended',
    route: AppRoutes.RECOMMENDED,
    icon: (isActive) => (
      <FavoriteBorderIcon color={isActive ? 'primary' : 'inherit'} />
    ),
  },
];

export const sidebarL3Items: NavItem[] = [
  {
    title: 'Settings',
    route: AppRoutes.SETTINGS,
    icon: (isActive) => (
      <SettingsIcon color={isActive ? 'primary' : 'inherit'} />
    ),
  },
  {
    title: 'Logout',
    route: AppRoutes.LOGOUT,
    icon: (isActive) => <LogoutIcon color={isActive ? 'primary' : 'inherit'} />,
  },
];

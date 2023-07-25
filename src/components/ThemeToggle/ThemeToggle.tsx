import { FC } from 'react';

import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

import useTheme from '@hooks/useTheme';

import { Theme } from '@constants/index';

import styles from './ThemeToggle.module.scss';

const ThemeToggle: FC = () => {
  const { theme, setTheme } = useTheme();
  const Icon = theme === Theme.LIGHT ? LightModeIcon : DarkModeIcon;

  const toggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setTheme(newTheme);
  };

  return (
    <IconButton onClick={toggleTheme} className={styles['theme-toggle-button']}>
      <Icon />
    </IconButton>
  );
};

export default ThemeToggle;

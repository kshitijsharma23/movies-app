import { Theme } from './index';

export const colors = {
  [Theme.DARK]: {
    // Background colors
    '--color-bg-primary': '#273244',
    '--color-bg-secondary': '#394b61',
    '--color-bg-navbar': '#1f2a3c',
    '--color-bg-progress': '#283647',
    '--color-bg-profile': '#8a38f5',

    // Text colors
    '--color-text-primary': '#d4d7dd',
    '--color-text-secondary': '#ffffff',

    // Accent colors
    '--color-accent-primary': '#00e0ff',
  },
  [Theme.LIGHT]: {
    // Background colors
    '--color-bg-primary': '#ffffff',
    '--color-bg-secondary': '#f3f6f9',
    '--color-bg-navbar': '#f6f6f7',
    '--color-bg-progress': '#cccccc',
    '--color-bg-profile': '#8a38f5',

    // Text colors
    '--color-text-primary': '#333333',
    '--color-text-secondary': '#000000',

    // Accent colors
    '--color-accent-primary': '#0072e5',
  },
};

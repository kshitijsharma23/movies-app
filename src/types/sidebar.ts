import { ReactNode } from 'react';
// import { NavigateFunction } from 'react-router-dom';

export interface NavIconProps {
  isActive: boolean;
}

export interface NavItem {
  title: string;
  route: string;
  icon: (isActive: boolean) => ReactNode;
}

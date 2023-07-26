import { ReactNode } from 'react';

export interface NavIconProps {
  isActive: boolean;
}

export interface NavItem {
  title: string;
  route: string;
  icon: (isActive: boolean) => ReactNode;
}

import { Theme } from '@constants/index';

export interface ThemeState {
  theme: Theme;
}

export interface ThemeAction {
  type: Theme;
}

export interface ApiData<T> {
  data: T | null;
  loading: boolean;
  hasError: boolean;
  error: string | null;
}

export interface ErrorResponse {
  message: string;
  status: number;
}

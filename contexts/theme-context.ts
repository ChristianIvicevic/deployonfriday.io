import { createContext } from 'utils/create-context';

export type Theme = 'dark' | 'light';

export type ApplicationThemeContext = {
  readonly currentTheme: Theme;
  toggleTheme(): void;
};

export const [useTheme, ApplicationThemeProvider] =
  createContext<ApplicationThemeContext>();

import { createContext } from 'utils/create-context';

export type Theme = 'dark' | 'light';

type ThemeContext = {
  currentTheme: Theme;
  toggleTheme(): void;
};

export const [useTheme, ThemeProvider] = createContext<ThemeContext>();

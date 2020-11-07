import { Classes, FocusStyleManager } from '@blueprintjs/core';
import classNames from 'classnames';
import { Theme, ThemeProvider } from 'contexts/theme-context';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import 'styles/main.scss';

FocusStyleManager.onlyShowFocusOnTabs();

const App = ({ Component, pageProps }: AppProps) => {
  const initialTheme: Theme = 'dark';
  const [currentTheme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    setTheme((localStorage.getItem('theme') as Theme) ?? initialTheme);
  }, []);

  const toggleTheme = () => {
    setTheme(previousTheme => {
      const newTheme = previousTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return (
    <div
      className={classNames('app', {
        'app--dark': currentTheme === 'dark',
        'app--light': currentTheme === 'light',
        [Classes.DARK]: currentTheme === 'dark',
      })}
    >
      <ThemeProvider
        value={{
          currentTheme,
          toggleTheme,
        }}
      >
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
};

export default App;

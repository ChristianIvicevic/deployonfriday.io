import { Classes, FocusStyleManager } from '@blueprintjs/core';
import '@blueprintjs/core/lib/css/blueprint.css';
import classNames from 'classnames';
import type { ApplicationThemeContext, Theme } from 'contexts/theme-context';
import { ApplicationThemeProvider } from 'contexts/theme-context';
import type { AppProps } from 'next/app';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
import { defaultTheme } from 'styles/default-theme';
import { GlobalStyles } from 'styles/global-styles';
import type { Transient } from 'utils/style-utils';

FocusStyleManager.onlyShowFocusOnTabs();

const App: FC<AppProps> = ({ Component, pageProps }) => {
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
    <>
      <Normalize />
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <StyledApp
          $currentTheme={currentTheme}
          className={classNames({
            [Classes.DARK]: currentTheme === 'dark',
          })}
        >
          <ApplicationThemeProvider
            value={{
              currentTheme,
              toggleTheme,
            }}
          >
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <Component {...pageProps} />
          </ApplicationThemeProvider>
        </StyledApp>
      </ThemeProvider>
    </>
  );
};

export default App;

const StyledApp = styled.div<
  Transient<Pick<ApplicationThemeContext, 'currentTheme'>>
>`
  background: var(--bg);
  color: var(--textNormal);
  min-height: 100vh;
  transition: color 0.2s ease-out 0s, background 0.2s ease-out 0s;

  ${({ $currentTheme }) =>
    $currentTheme === 'light'
      ? css`
          --bg: #fff;
          --blue: #2b95d6;
          --textNormal: #222;
          --textTitle: #222;
          --textLink: var(--blue);
          --hr: rgba(0, 0, 0, 0.2);
          --inlineCode-bg: rgba(255, 229, 100, 0.2);
          --inlineCode-text: #1a1a1a;
        `
      : css`
          -webkit-font-smoothing: antialiased;
          --bg: #282c35;
          --blue: #48aff0;
          --textNormal: hsla(0, 0%, 100%, 0.88);
          --textTitle: #fff;
          --textLink: var(--blue);
          --hr: hsla(0, 0%, 100%, 0.2);
          --inlineCode-bg: rgba(115, 124, 153, 0.2);
          --inlineCode-text: #e6e6e6;
        `}
`;

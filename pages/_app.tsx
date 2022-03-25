import type { AppProps } from 'next/app';
import 'styles/globals.css';

// noinspection JSUnusedGlobalSymbols
export default ({ Component, pageProps }: AppProps) => (
  <>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <Component {...pageProps} />
  </>
);

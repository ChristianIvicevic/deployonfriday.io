import { SiteMetadata } from 'constants/site-metadata';
import Head from 'next/head';
import type { ReactNode } from 'react';

type Props = {
  readonly title?: string;
  readonly children: ReactNode;
};

export const Page = ({ children, title }: Props) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta charSet="utf-8" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <title>
        {title === undefined
          ? `${SiteMetadata.title} \u2014 A blog by ${SiteMetadata.author.name}`
          : `${title} \u2014 ${SiteMetadata.title}`}
      </title>
    </Head>
    {children}
  </>
);

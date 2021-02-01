import { SiteMetadata } from 'constants/site-metadata';
import Head from 'next/head';
import type { FC } from 'react';

type Props = {
  readonly description?: string;
  readonly title?: string;
};

export const Seo: FC<Props> = ({
  description = `Personal blog by ${SiteMetadata.author.name}. ${SiteMetadata.author.summary}`,
  title = SiteMetadata.title,
}) => {
  const url =
    SiteMetadata.siteUrl +
    (typeof window !== 'undefined' ? window.location.pathname : '');

  return (
    <Head>
      <meta name="description" content={description} key="description" />
      <meta property="og:title" content={title} key="ogtitle" />
      <meta property="og:url" content={url} key="ogurl" />
      <meta
        property="og:site_name"
        content={SiteMetadata.title}
        key="ogsitename"
      />
      <meta property="og:description" content={description} key="ogdesc" />
      <meta property="twitter:card" content="summary" key="twittercard" />
      <meta
        property="twitter:creator"
        content={SiteMetadata.author.name}
        key="twittercreator"
      />
      <meta property="twitter:title" content={title} key="twittertitle" />
      <meta
        property="twitter:description"
        content={description}
        key="twitterdesc"
      />
      <link rel="canonical" href={url} key="canonical" />
    </Head>
  );
};

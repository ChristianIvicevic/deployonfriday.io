import { SiteMetadata } from 'constants/site-metadata';
import Head from 'next/head';

type Props = {
  description?: string;
  title?: string;
  url?: string;
};

export const Seo = ({
  description = `Personal blog by ${SiteMetadata.author.name}. ${SiteMetadata.author.summary}`,
  title = SiteMetadata.title,
  url = '',
}: Props) => (
  <Head>
    <meta name="description" content={description} key="description" />
    <meta property="og:title" content={title} key="ogtitle" />
    <meta
      property="og:url"
      content={`${SiteMetadata.siteUrl}/${url}`}
      key="ogurl"
    />
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
  </Head>
);

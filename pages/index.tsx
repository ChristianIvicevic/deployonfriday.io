import { Page } from 'components/page';
import { Post } from 'components/post';
import { SiteMetadata } from 'constants/site-metadata';
import { getAllPosts } from 'lib/posts';
import { InferGetStaticPropsType } from 'next';
import Head from 'next/head';

const SITE_DESCRIPTION = `Personal blog by ${SiteMetadata.author.name}. ${SiteMetadata.author.summary}`;
const SITE_TITLE = SiteMetadata.title;

const Index = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Page index>
    <Head>
      <meta name="description" content={SITE_DESCRIPTION} />
      <meta property="og:title" content={SITE_TITLE} key="ogtitle" />
      <meta property="og:url" content={SiteMetadata.siteUrl} key="ogurl" />
      <meta property="og:site_name" content={SITE_TITLE} key="ogsitename" />
      <meta property="og:description" content={SITE_DESCRIPTION} key="ogdesc" />
      <meta property="twitter:card" content="summary" key="twittercard" />
      <meta
        property="twitter:creator"
        content={SiteMetadata.author.name}
        key="twittercreator"
      />
      <meta property="twitter:title" content={SITE_TITLE} key="twittertitle" />
      <meta
        property="twitter:description"
        content={SITE_DESCRIPTION}
        key="twitterdesc"
      />
    </Head>
    {posts.map(({ date, slug, title, description, category, readingTime }) => (
      <Post
        key={slug}
        date={date}
        title={title}
        description={description}
        slug={slug}
        readingTime={readingTime}
        category={category}
      />
    ))}
  </Page>
);

export default Index;

export const getStaticProps = async () => ({
  props: {
    posts: await getAllPosts(),
  },
});

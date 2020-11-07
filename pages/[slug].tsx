import { ArticleFooter, ArticleFooterProps } from 'components/article-footer';
import { Page } from 'components/page';
import { PostCategory } from 'components/post-category';
import { PostDetails } from 'components/post-details';
import { SiteMetadata } from 'constants/site-metadata';
import { getAllPosts } from 'lib/posts';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { PromiseValue } from 'type-fest';

export type PostParams = {
  slug: string;
};

const Post = ({
  currentPost: {
    title,
    category,
    date,
    readingTime,
    htmlContent,
    description,
    slug,
  },
  previousLink,
  nextLink,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Page
    footer={<ArticleFooter previousLink={previousLink} nextLink={nextLink} />}
    title={title}
  >
    <Head>
      <meta name="description" content={description} />
      <meta
        property="og:url"
        content={`${SiteMetadata.siteUrl}/${slug}`}
        key="ogurl"
      />
      <meta property="og:title" content={title} key="ogtitle" />
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
    <article className="article">
      <header>
        <PostCategory category={category} />
        <h1 className="article__title">{title}</h1>
        <PostDetails
          date={date}
          readingTime={readingTime}
          className="article__details"
        />
      </header>
      <div
        className="article__content"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  </Page>
);

export default Post;

export const getStaticPaths: GetStaticPaths<PostParams> = async () => ({
  paths: (await getAllPosts()).map(({ slug }) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<
  {
    currentPost: PromiseValue<ReturnType<typeof getAllPosts>>[number];
  } & ArticleFooterProps,
  PostParams
> = async ({ params }) => {
  const allPosts = await getAllPosts();
  const currentPostId = allPosts.findIndex(({ slug }) => slug === params?.slug);
  const previousPost =
    currentPostId !== allPosts.length ? allPosts[currentPostId + 1] : undefined;
  const nextPost =
    currentPostId !== 0 ? allPosts[currentPostId - 1] : undefined;
  return {
    props: {
      currentPost: allPosts[currentPostId],
      ...(previousPost === undefined
        ? {}
        : {
            previousLink: {
              slug: previousPost.slug,
              title: previousPost.title,
            },
          }),
      ...(nextPost === undefined
        ? {}
        : {
            nextLink: {
              slug: nextPost.slug,
              title: nextPost.title,
            },
          }),
    },
  };
};

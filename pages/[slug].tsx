import { ArticleFooter, ArticleFooterProps } from 'components/article-footer';
import { Page } from 'components/page';
import { PostCategory } from 'components/post-category';
import { PostDetails } from 'components/post-details';
import { Seo } from 'components/seo';
import { getAllPosts } from 'lib/posts';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import type { PromiseValue } from 'type-fest';

export type PostParams = {
  slug: string;
};

const Article = ({
  currentPost: { title, category, date, readingTime, htmlContent, description },
  previousLink,
  nextLink,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Page
    footer={<ArticleFooter previousLink={previousLink} nextLink={nextLink} />}
    title={title}
  >
    <Seo description={description} title={title} />
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

export default Article;

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

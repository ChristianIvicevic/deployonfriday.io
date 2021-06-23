import type { ArticleFooterProps } from 'components/article-footer';
import { ArticleFooter } from 'components/article-footer';
import { Category } from 'components/category';
import { Details } from 'components/details';
import { Page } from 'components/page';
import { Seo } from 'components/seo';
import { getAllPosts } from 'lib/posts';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';
import type { FC } from 'react';
import styled from 'styled-components';
import type { PromiseValue } from 'type-fest';

export type PostParams = {
  readonly slug: string;
};

const ArticlePage: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  currentPost: { title, category, date, readingTime, htmlContent, description },
  previousLink,
  nextLink,
}) => (
  <Page
    footer={<ArticleFooter previousLink={previousLink} nextLink={nextLink} />}
    title={title}
  >
    <Seo description={description} title={title} />
    <article>
      <header>
        <Category category={category} />
        <Title>{title}</Title>
        <Details date={date} readingTime={readingTime} hasArtificialMargin />
      </header>
      <Content
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  </Page>
);

export default ArticlePage;

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

const Title = styled.h1`
  color: var(--textTitle);
  font-size: 2.5rem;
  margin-bottom: 2rem;
  margin-top: 1rem;
`;

const Content = styled.div`
  margin-bottom: 4rem;

  & img {
    width: 100%;
  }

  figcaption {
    font-size: 0.9rem;
    opacity: 0.75;
  }
`;

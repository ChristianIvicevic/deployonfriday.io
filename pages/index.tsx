import { ArticlePreview } from 'components/article-preview';
import { Layout } from 'components/layout';
import { Page } from 'components/page';
import { Seo } from 'components/seo';
import { getAllPosts } from 'lib/posts';
import type { InferGetStaticPropsType } from 'next';

// noinspection JSUnusedGlobalSymbols
export default ({
  articles,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Page>
    <Seo />
    <Layout>
      {articles.map(({ date, title, description, slug, category }) => (
        <ArticlePreview
          key={slug}
          category={category}
          title={title}
          slug={slug}
          description={description}
          date={date}
        />
      ))}
    </Layout>
  </Page>
);

export const getStaticProps = async () => ({
  props: {
    articles: await getAllPosts(),
  },
});

import { Page } from 'components/page';
import { Post } from 'components/post';
import { Seo } from 'components/seo';
import { getAllPosts } from 'lib/posts';
import type { InferGetStaticPropsType } from 'next';

const Index = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Page index>
    <Seo />
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

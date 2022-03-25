import { Badge } from 'components/badge';
import { Layout } from 'components/layout';
import { Page } from 'components/page';
import { Seo } from 'components/seo';
import { getAllPosts } from 'lib/posts';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';

type Params = {
  readonly slug: string;
};

// noinspection JSUnusedGlobalSymbols
export default ({
  currentPost: { category, description, htmlContent, title, date },
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Page title={title}>
    <Seo title={title} description={description} />
    <Layout condensed>
      <article className="prose prose-slate max-w-none prose-a:decoration-sky-300 prose-a:decoration-2 hover:prose-a:decoration-4 prose-figure:flex prose-figure:flex-col prose-figure:justify-center lg:prose-xl">
        <div className="not-prose">
          <h1 className="mb-2 text-3xl font-bold text-black md:text-4xl">
            {title}
          </h1>
          <div className="flex">
            <time
              dateTime={date}
              className="my-auto mr-2 text-slate-500 md:text-lg"
            >
              {date}
            </time>
            <Badge category={category} />
          </div>
        </div>
        {/* eslint-disable-next-line react/no-danger */}
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </article>
    </Layout>
  </Page>
);

// noinspection JSUnusedGlobalSymbols
export const getStaticPaths: GetStaticPaths<Params> = async () => ({
  paths: (await getAllPosts()).map(({ slug }) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<
  {
    currentPost: Awaited<ReturnType<typeof getAllPosts>>[number];
  },
  Params
> = async ({ params }) => {
  const allPosts = await getAllPosts();
  const currentPostId = allPosts.findIndex(({ slug }) => slug === params?.slug);
  return {
    props: {
      currentPost: allPosts[currentPostId],
    },
  };
};

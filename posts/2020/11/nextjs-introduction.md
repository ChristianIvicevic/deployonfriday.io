---
title: I have tried out Next.js to build my personal blog so you don't have to
description: >-
  Rather than sticking with the popular Gatsby framework I wanted to learn something new.
  Therefore I decided to use Next.js to build my personal blog and share my new knowledge.
date: 2020-11-10
category: React
---

One of my personal New Year's resolutions for 2020 was to start a micro-blog to share small bits of insight and information.
This was merely two months after attending the ReactiveConf 2019 in Prague where Kyle Mathews, the founder of Gatsby, was one of the speakers.
Kyle did advertise some of their newest features and by that time I decided to give Gatsby a try to setup a blog.
Unfortunately I never really finished what I started, due to technical issues and not enough available time to get it done.

Fast-forward to November 2020 when I finally decided to commit to this project and wanted to try out Next.js this time around.
Not only has Next.js gained a lot of traction in the past months, but I've personally heard positive feedback from friends who have been using it in production for their big projects so it was only a matter of time until I give it a try.
In this post I want to tell you about the basics and core concepts of Next.js and share how I developed my personal blog.

## What is Next.js?

> Next.js extends with React with server-side rendering and static site generation capabilities as well as offering features such as internationalization, analytics and even serverless lambdas out-of-the-box.

Next.js is a zero-config framework built on top of React with added convenience features by convention that newly bootstrapped projects using create-react-app don't provide right away.
In comparison to other frameworks such as Angular or Vue the difference is that React is merely a UI library that allows developers to define reusable components, compose and render them.
For other features, such as routing, animations, internationalization or global state-management it is necessary to install and configure additional dependencies based on the needs of the project.
Any actual framework delivers some or most of these features out-of-the-box based on certain coding conventions and Next.js is no exception to that.

One of the primary features that Next.js has become popular for is server-side rendering.
A technique that was very common before the concept of single-page applications has gained traction.
Nowadays it is more common to visit websites that perform most of their workload on the client rather than the server itself.
Server-side rendering however is crucial when you want to perform search engine optimization, one of the reasons it is often preferred for certain applications that have dynamic content that has to be indexed properly.

Just recently Next.js has introduced static site generation which builds all available pages during the build-time.
The benefit of this technique for static content is that it can be served at high-speed via CDN as it is a single prebuilt artifact, i.e. a typical HTML page with the least amount of necessary Javascript that is used to enable interactivity.
Sites that have been statically generated don't require an actual backend server and the client usually just renders the content right away without the need to query further data.
Eventually statically generated sites improve the user experience significantly with the information being much faster at their disposal.

A remarkable feature that surprised me is the capability of running a hybrid application, i.e. mixing static site generation and server-side rendering in the same project.
Thus you can pre-render a set of static pages, e.g. an index page or a FAQ page, in advance while serving other pages dynamically using server-side rendering, e.g. products in e-commerce platforms with current prices and data.

## Comparing Gatsby and Next.js based on personal experience

*Disclaimer: This section is entirely based on my previous experience with Gatsby.
Unfortunately I haven't invested enough time to give a credible and thorough comparison, nevertheless I wanted to share which issues I had with Gatsby when using it together with starters and plugins.*

> Gatsby has a rich ecosystem of starters, themes and very useful plugins to get you started pretty quickly, however any customization felt like a chore and unnecessarily convoluted.
> GraphQL as the default data source for virtually all information feels highly overengineered as well, no matter how structured data is made available to the developer.
>
> In stark contrast to that, Next.js provides you with a clean boilerplate that doesn't force you to follow strict conventions for styling, components or data querying.
> They are optional and convenient, but not required.
> The possibility to freely query any data source is awesome, especially for beginners.

### Gatsby

Initially the idea of Gatsby was very promising: pick a starter, a theme, some plugins and supply the project with Markdown files representing your blog posts.
I got it running pretty quickly which is always pleasant when trying out a new technology for the first time.
However my experience when trying to customize certain elements of the page was really bad.

First, I wanted to slightly change the styling and adjust some typography variables.
There were multiple of them spread across the starter, the theme and the generated boilerplate and I got lost where to configure those.

The next change request I had was to adjust the templates slightly - basically I wanted to replace some elements in the footer.
Eventually I figured out, that in order to replace the footer originally located in `node_modules/theme/dir/footer.mdx` I had to create a duplicate file at `theme/dir/footer.mdx` with custom content to override the original content.
This replaces the previous footer supplied by the theme, so I had to copy and paste the original content making it nigh impossible to keep my changed templates in sync with upstream changes.

On top of that the styles used throughout the template relied on some helper functions I was not familiar with to compute responsive values, presumable mapping to `rem` units - nevertheless it wasn't really obvious where these come from.
Furthermore there were inline styles all over the place rather than proper SCSS, not even CSS-in-JS, just plain inline styles.

Ultimately what really left me speechless is the required use of GraphQL to specify which data to query for pages and components causing a high cognitive load for even simple tasks such as computing the estimated reading time of a post.
In my opinion another unnecessary layer of complexity that requires developers new to GraphQL to get acquainted with it, figure out which data is actually queryable and then to define their respective queries.
More often than not I had issues figuring out which plugins do add further queryable data and where this data is actually stored.

**It is highly likely that I made a severe mistake by trying to leverage the ecosystem rather than starting from scratch with much more control.
Alas, this seemed like the most common way newcomers would approach a first project with Gatsby that I wanted to mimick.**

Even though I am complaining a lot about my experience I have to point out that the Gatsby community has a rich ecosystem of plugins.
For most common use cases there is a plugin that you can register in the configuration which will automatically do its job.
This includes plugins for offline capabilities, responsive images, search engine optimization improvements, automated syntax-highlighting of code in posts etc.
Albeit useful I personally prefer to have more control over plugins and how they operate.
This is most likely one of the reasons starting out with an already running set of starters caused so many headaches.

### Next.js

Unlike Gatsby the development with Next.js felt like a breeze and pretty much everything came together organically.
I started from scratch with a boostrapped project using create-next-app and was quickly able to define my components.
For styling it is possible to use CSS-in-JS or SCSS which are supported right out of the box.
Alternatively you can just install any other solution such as Styled Components or anything else if you have other preferences.
No particular styling approach has really impressed me thus I always stick to classic SCSS files using the BEM naming convention in all of my projects.

Out-of-the-box a Next.js application, even though it has no classic entrypoint like create-react-app, behaves just like any other React-powered application.
Features like server-side rendering or static site generation are strictly opt-in and enabled by the existance of methods with special names in corresponding files.
Therefore my workflow when developing the blog was initially pretty much the same as with any classic React-powered application.
The only significant difference was that files located under `pages/*` are mapped to routes and these files can have special names to make Next.js aware that they are dynamic based on query parameters or the URL itself such as `[slug].tsx` indicating the page expects one query parameter which is called slug.
A page file located in `pages/foo/bar.tsx` would be automatically mapped to `/foo/bar` without the need to configure any routing options at all.

After having finished all components with mocked data it was about time to introduce static site generation capabilities.
I was completely free to choose how to supply the static data - be it from the file system, via API calls during build-time or by connecting to a database.
For the blog I decided to store the blog posts in Markdown files that are read and parsed during build-time to produce proper HTML output.

## Static Site Generation with Next.js

> Next.js pages can export respective special methods `getStaticProps` and `getStaticPaths` alongside their own code to declare which props and paths will be used during the build-time to pre-render the pages and their variants.

### Index page
My index page is located under `pages/index.tsx` which is mapped automatically to the route `/`.
Each page component has to be a default export in one of the files located under `pages/*`.

In order to enable such a page to be statically generated, there must be a co-located named export of an `async` method called `getStaticProps`.
During build-time this method is invoked locally in a Node.js environment to supply the page with props, hence you can access the modules `fs` or `path` to read local files, something that wouldn't be possible in a browser environment.

This is the first time Next.js introduces us to mixing code that is only available and used during build-time and code that is only available during runtime in the very same file - therefore the boundaries between a browser environment and a Node environment vanish to increase the developer experience.

At the time of writing this post the index page of my blog looks as follows:

```tsx{7,26-30}
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
```

As you can see the page does nothing else than render a bunch of post previews based on the supplied posts via the props.
The type `InferGetStaticPropsType` is Typescript sugar to infer the prop types via the return value of the `getStaticProps` method without the need to define them explicitly.
However this approach is just my personal nuance as I prefer to let Typescript infer types whenever reasonable and helpful.

Finally `getStaticProps` itself allows us to define which props are used to pre-render the index page.
In this case it is just a custom method `getAllPosts` which internally parses all Markdown files in my `posts` folder and returns their contents and metadata defined in their front matter.
However the implementation details of this method aren't specific to Next.js as they are classic Node.js function calls.

### Post page

Now that we have an index page listing all available posts, we need another page to render single posts.
For my blog I decided to route them directly as `/:slug` without any prefix in the URL to improve search engine optimization.
This route is achieved by having the file located under `pages/[slug].tsx`, a unique name that Next.js needs to deduce it has a dynamic parameter we refer to as `slug`.

Pages that have multiple variants based on the URL or query parameters require a second special `async` method to be exported called `getStaticPaths`.
This method is invoked during build-time and it has to return all paths that will be available during runtime.
For each of those paths a variant of the page is pre-rendered using the `getStaticProps` method with the current path as an argument.

A shortened version of this page located under `pages/[slug].tsx` is this:

```tsx{18-21,23,25}
import { getAllPosts } from 'lib/posts';
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next';

const Article = ({
  currentPost,
  previousLink,
  nextLink,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  {/* ... */}
);

export default Article;

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: (await getAllPosts()).map(({ slug }) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const allPosts = await getAllPosts();
  const currentPostId = allPosts.findIndex(({ slug }) => slug === params?.slug);
  // ... previousLink and nextLink are deduced here
  return {
    props: {
      currentPost: allPosts[currentPostId],
      // ... previousLink and nextLink
    },
  };
};
```

As described previously `getStaticPaths` is invoked during build-time and will return slugs for all available posts to define all possible paths that are valid for `/:slug`.
All other paths that are requested during runtime will yield a 404 error and are routed to a 404 page that is created by default.

Another unique feature is a hybrid mode using the special `fallback` option returned by `getStaticPaths`.
It is possible to pre-render some paths during build-time and paths for which `fallback` equals `true` during runtime on the server when it is requested for the very first time.
This feature is especially useful if you end up having many thousands of pages and pre-rendering them all during build-time is no longer a feasible option which can happen in e-commerce for instance.

Finally, `getStaticProps` has access during build-time (or even during runtime if `fallback` equals `true`) to the respective `params.slug` variable that takes on the value of each returned path by `getStaticPaths`.
Using this you can fetch the necessary props for pre-rendering a specific variant of the page based on the parameter.

## Advanced Features

> For more dynamic content and behavior Next.js provides the ability to use server-side rendering via the `getServerSideProps` method as well as to define lambda functions that are executed serverless.

### Server-side rendering

Should you need to update certain pages so regularly that pre-rendering them during build-time is not a viable option the `async` method `getServerSideProps` instead of the `getStaticProps` is a drop-in replacement to enable server-side rendering for a particular page.
This way the HTML content is re-rendered for every single request.

### Lambdas

A feature that really surprised me is the possibility to define custom lambdas co-located with pages.
By doing so the application will be a hybrid and expose those endpoints via `/api/*` for each lambda defined in the `pages/api` folder.
Assume you have the following lambda located as `pages/api/user/name.ts`:

```tsx
import type { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: 'John Doe' });
};
```

Requesting `/api/user/name` from within the frontend, for instance in a `getServerSideProps` method or as the handler of an event, will invoke the lambda and return the object `{ name: 'John Doe' }` with status code 200.
A possible use case is the registration for a newsletter or an authentication for users.

This feature is awesome as it allows you to write some backend code without having to create an entire backend yourself.
Basically you're able to build a true fullstack application that can leverage being co-located with the actual frontend code as they can share code, types and many more.

## Hosting

> Next.js applications can be easily hosted on Vercel for free, even on AWS using Lambda@Edge should it be necessary.

The Next.js framework has been developed by Vercel, previously known as Zeit.
Zeit Now has been the former deployment platform that has been renamed to Vercel as well.
They provide an automated CI/CD integration via the respective Github application that I am personally using.
Temporary deployments for incoming merge requests are created automatically to be able to preview changes right away.
And the best is that it is completely free for hobby purposes and thus cheaper than any other hosting service, especially DigitalOcean and AWS.

With regards to AWS it seems as if Next.js applications cannot run with usual S3 buckets in combination with lambdas in the free tier as they require Lambda@Edge which is on the pricier side.
Unfortunately I have no experience with such a deployment to AWS yet as Vercel has been sufficient thus far, but I will be looking into it in the upcoming weeks to try it myself.

## Conclusion

To be honest, I am impressed by Next.js and the Vercel deployment platform.
Frankly, I started from scratch without any template so I had no technical issues with customization.
Something I may have been able to avoid with Gatsby had I started from scratch as well.
For the time being though I will definitely stick to Next.js for my blog and possibly other static personal projects.

With regards to using Next.js at work I am currently on the fence.
The reason being that our current project is cloud-native based on AWS and connected to dozens of classic Java backends, therefore using lambdas to handle some processes ourselves isn't really useful.
Furthermore our current frontend isn't about pre-rendered pages and would not benefit from server-side rendering either.
Therefore sticking to our classic create-react-app bootstrapped project will suffice for the time being.

---

If you want to check the full source code of the blog itself, head over to the [deployonfriday.io repository](https://github.com/ChristianIvicevic/deployonfriday.io).

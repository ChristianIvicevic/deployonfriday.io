import { PostCategory } from 'components/post-category';
import { PostDetails } from 'components/post-details';
import Link from 'next/link';

type Props = {
  title: string;
  description: string;
  date: string;
  slug: string;
  readingTime: number;
  category: string;
};

export const Post = ({
  date,
  description,
  title,
  slug,
  readingTime,
  category,
}: Props) => (
  <article className="post">
    <header>
      <PostCategory category={category} />
      <h3 className="post__title">
        <Link href={`/${slug}`}>{title}</Link>
      </h3>
      <PostDetails date={date} readingTime={readingTime} />
    </header>
    <p>{description}</p>
  </article>
);

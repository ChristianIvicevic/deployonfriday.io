import { Badge } from 'components/badge';
import Link from 'next/link';

type Props = {
  readonly category: string;
  readonly title: string;
  readonly slug: string;
  readonly description: string;
  readonly date: string;
};

export const ArticlePreview = ({
  category,
  title,
  slug,
  description,
  date,
}: Props) => (
  <article className="mb-10 flex flex-col gap-2 md:flex-row md:gap-8">
    <div className="flex w-auto flex-row pt-1 md:w-[150px] md:flex-col">
      <div className="my-auto mr-2 mt-0.5 text-slate-500 md:mt-0 md:mb-5 md:mr-0 md:flex md:flex-row-reverse md:pt-0">
        <time dateTime={date}>{date}</time>
      </div>
      <div className="my-auto md:my-0 md:flex md:flex-row-reverse">
        <Badge category={category} />
      </div>
    </div>
    <div className="flex-1">
      <div className="mb-3 text-2xl font-bold leading-snug">
        <Link href={`/${slug}`}>{title}</Link>
      </div>
      <div className="mb-4 text-lg leading-relaxed text-slate-500">
        {description}
      </div>
      <Link href={`/${slug}`}>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="text-lg font-semibold underline decoration-sky-300 decoration-2 hover:decoration-4">
          Read more
          <span className="sr-only">, {title}</span>
        </a>
      </Link>
    </div>
  </article>
);

import classNames from 'classnames';
import { SiteMetadata } from 'constants/site-metadata';
import Link from 'next/link';

type Props = {
  readonly condensed?: boolean;
};

export const Header = ({ condensed = false }: Props) => (
  <>
    <h1
      className={classNames(
        'mb-3 pt-20 font-extrabold underline decoration-sky-300 decoration-2 hover:decoration-4',
        {
          'text-3xl': condensed,
          'text-4xl': !condensed,
        },
      )}
    >
      <Link href="/">{SiteMetadata.title}</Link>
    </h1>

    <p
      className={classNames('text-slate-500', {
        'text-md': condensed,
        'text-lg': !condensed,
      })}
    >
      Personal blog by {SiteMetadata.author.name}. {SiteMetadata.author.summary}
    </p>
  </>
);

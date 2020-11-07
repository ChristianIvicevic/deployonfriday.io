import classNames from 'classnames';
import { DefaultFooter } from 'components/default-footer';
import { Profile } from 'components/profile';
import { ThemeSwitch } from 'components/theme-switch';
import { SiteMetadata } from 'constants/site-metadata';
import Head from 'next/head';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

type Props = {
  index?: boolean;
  footer?: ReactNode;
  title?: string;
};

export const Page: FC<Props> = ({
  children,
  index = false,
  footer = <DefaultFooter />,
  title,
}) => {
  const TitleComponent = index ? 'h1' : 'h2';

  return (
    <div className="page">
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta charSet="utf-8" />
        <title>
          {title === undefined
            ? `${SiteMetadata.title} \u2014 A blog by ${SiteMetadata.author.name}`
            : `${title} \u2014 ${SiteMetadata.title}`}
        </title>
      </Head>
      <header className="page__header">
        <TitleComponent
          className={classNames('page__title', {
            'page__title--small': !index,
          })}
        >
          <Link href="/">{SiteMetadata.title}</Link>
        </TitleComponent>
        <ThemeSwitch />
      </header>
      {index && (
        <aside>
          <Profile />
        </aside>
      )}
      <main>{children}</main>
      {!index && (
        <aside>
          <Profile />
        </aside>
      )}
      <footer className="page__footer">{footer}</footer>
    </div>
  );
};

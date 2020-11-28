import { Icon } from '@blueprintjs/core';
import classNames from 'classnames';
import { SiteMetadata } from 'constants/site-metadata';
import Link from 'next/link';

export type PostFooterLink = {
  slug: string;
  title: string;
};

export type ArticleFooterProps = {
  previousLink?: PostFooterLink;
  nextLink?: PostFooterLink;
};

export const ArticleFooter = ({
  previousLink,
  nextLink,
}: ArticleFooterProps) => (
  <>
    <nav className="article__footer">
      {previousLink ? (
        <div className="article__nav-link">
          <Link href={`/${previousLink.slug}`}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="article__nav-anchor">
              <Icon icon="arrow-left" className="article__nav-icon" />
              {previousLink.title}
            </a>
          </Link>
        </div>
      ) : (
        <>
          {/* We need this empty div in case we're at the first post. */}
          <div />
        </>
      )}
      {nextLink && (
        <div className="article__nav-link">
          <Link href={`/${nextLink.slug}`}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="article__nav-anchor">
              {nextLink.title}
              <Icon
                icon="arrow-right"
                className={classNames(
                  'article__nav-icon',
                  'article__nav-icon--next',
                )}
              />
            </a>
          </Link>
        </div>
      )}
    </nav>
    <hr />
    <div className="article__feedback">
      <a
        href={SiteMetadata.feedbackLink}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        Leave a comment or share feedback on Github
      </a>
    </div>
  </>
);

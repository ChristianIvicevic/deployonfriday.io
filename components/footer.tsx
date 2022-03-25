import { SiteMetadata } from 'constants/site-metadata';
import { Fragment } from 'react';

export const Footer = () => (
  <>
    {SiteMetadata.social.map(({ href, title }, index) => (
      <Fragment key={title}>
        {index > 0 && <span> &bull; </span>}
        <a
          href={href}
          rel="nofollow noopener noreferrer"
          target="_blank"
          className="text-lg font-semibold underline decoration-sky-300 decoration-2 hover:decoration-4"
        >
          {title}
        </a>
      </Fragment>
    ))}
  </>
);

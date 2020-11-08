import { SiteMetadata } from 'constants/site-metadata';
import { Fragment } from 'react';

export const DefaultFooter = () => (
  <>
    {SiteMetadata.social.map(({ href, title }, index) => (
      <Fragment key={title}>
        {index > 0 && <span> &bull; </span>}
        <a href={href} rel="nofollow noopener noreferrer" target="_blank">
          {title}
        </a>
      </Fragment>
    ))}
  </>
);

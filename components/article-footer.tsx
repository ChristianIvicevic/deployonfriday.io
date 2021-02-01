import { Icon } from '@blueprintjs/core';
import { SiteMetadata } from 'constants/site-metadata';
import Link from 'next/link';
import type { FC } from 'react';
import styled, { css } from 'styled-components';

export type PostFooterLink = {
  readonly slug: string;
  readonly title: string;
};

export type ArticleFooterProps = {
  readonly previousLink?: PostFooterLink;
  readonly nextLink?: PostFooterLink;
};

export const ArticleFooter: FC<ArticleFooterProps> = ({
  previousLink,
  nextLink,
}) => (
  <>
    <Footer>
      {previousLink ? (
        <LinkWrapper>
          <Link href={`/${previousLink.slug}`}>
            <Anchor>
              <NavigationIcon icon="arrow-left" />
              {previousLink.title}
            </Anchor>
          </Link>
        </LinkWrapper>
      ) : (
        <>
          {/* We need this empty div in case we're at the first post. */}
          <div />
        </>
      )}
      {nextLink && (
        <LinkWrapper>
          <Link href={`/${nextLink.slug}`}>
            <Anchor>
              {nextLink.title}
              <NavigationIcon icon="arrow-right" $isNext />
            </Anchor>
          </Link>
        </LinkWrapper>
      )}
    </Footer>
    <hr />
    <Feedback>
      <a
        href={SiteMetadata.feedbackLink}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        Leave a comment or share feedback on Github
      </a>
    </Feedback>
  </>
);

const Footer = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 1.75rem;
`;

const LinkWrapper = styled.div`
  margin-bottom: 1rem;
`;

const Anchor = styled.a`
  align-items: center;
  display: flex;
`;

const NavigationIcon = styled(Icon)<{ readonly $isNext?: boolean }>`
  margin-right: 0.5rem;

  ${({ $isNext = false }) =>
    $isNext &&
    css`
      margin-left: 0.5rem;
      margin-right: 0;
    `}
`;

const Feedback = styled.div`
  display: flex;
  font-size: 90%;
  justify-content: center;
`;

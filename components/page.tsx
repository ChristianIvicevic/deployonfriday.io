import { DefaultFooter } from 'components/default-footer';
import { Profile } from 'components/profile';
import { ThemeSwitch } from 'components/theme-switch';
import { SiteMetadata } from 'constants/site-metadata';
import Head from 'next/head';
import Link from 'next/link';
import type { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';

type Props = {
  readonly index?: boolean;
  readonly footer?: ReactNode;
  readonly title?: string;
};

export const Page: FC<Props> = ({
  children,
  index = false,
  footer = <DefaultFooter />,
  title,
}) => (
  <StyledPage>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta charSet="utf-8" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <title>
        {title === undefined
          ? `${SiteMetadata.title} \u2014 A blog by ${SiteMetadata.author.name}`
          : `${title} \u2014 ${SiteMetadata.title}`}
      </title>
    </Head>
    <Header>
      <Title as={index ? 'h1' : 'h2'} small={!index}>
        <Link href="/">{SiteMetadata.title}</Link>
      </Title>
      <ThemeSwitch />
    </Header>
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
    <Footer>{footer}</Footer>
  </StyledPage>
);

const StyledPage = styled.div`
  margin: 0 auto;
  max-width: 44rem;
  padding: 2.5rem 1.5rem;
`;

const Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.5rem;
`;

const Title = styled.h1<{ small?: boolean }>`
  font-family: ${props => props.theme.fonts.primary};
  font-size: ${props => (props.small === true ? '1.5rem' : '2rem')};
  font-weight: 700;
  line-height: 2.625rem;
  margin-bottom: 0;
  margin-top: 0;

  & > a {
    box-shadow: none;
    color: ${props =>
      props.small === true
        ? css`var(--textLink)`
        : css`var(--textTitle)`} !important;
    text-decoration: none;

    &:hover {
      box-shadow: none;
      text-decoration: none;
    }
  }
`;

const Footer = styled.footer`
  margin-top: 4rem;
`;

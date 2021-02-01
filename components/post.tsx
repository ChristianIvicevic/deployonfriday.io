import { Category } from 'components/category';
import { Details } from 'components/details';
import Link from 'next/link';
import type { FC } from 'react';
import styled from 'styled-components';

type Props = {
  readonly title: string;
  readonly description: string;
  readonly date: string;
  readonly slug: string;
  readonly readingTime: number;
  readonly category: string;
};

export const Post: FC<Props> = ({
  date,
  description,
  title,
  slug,
  readingTime,
  category,
}) => (
  <article>
    <header>
      <Category category={category} />
      <Title>
        <Link href={`/${slug}`}>{title}</Link>
      </Title>
      <Details date={date} readingTime={readingTime} />
    </header>
    <p>{description}</p>
  </article>
);

const Title = styled.h3`
  font-family: ${props => props.theme.fonts.primary};
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 0.5rem;
  margin-top: 1rem;

  & > a {
    box-shadow: none;
    color: var(--textLink) !important;
    text-decoration: none;

    &:hover {
      box-shadow: none;
      text-decoration: none;
    }
  }
`;

import { Tag } from '@blueprintjs/core';
import type { FC } from 'react';
import styled, { css } from 'styled-components';
import type { Transient } from 'utils/style-utils';

type Props = {
  readonly category: string;
};

export const Category: FC<Props> = ({ category }) => (
  <StyledCategory $category={category}>{category}</StyledCategory>
);

const StyledCategory = styled(Tag)<Transient<Props>>`
  display: table;
  margin-top: 3.5rem;

  && {
    /* TODO: Move this to the theme into a dictionary. */
    ${props =>
      props.$category === 'Javascript' &&
      css`
        background: #ffc940;
        color: #182026;
      `}

    ${props =>
      props.$category === 'React' &&
      css`
        background: #61dafb;
        color: #182026;
      `}

    ${props =>
      props.$category === 'Typescript' &&
      css`
        background: #137cbd;
        color: #182026;
      `}
  }
`;

import { ReadingTime } from 'components/reading-time';
import type { FC } from 'react';
import styled from 'styled-components';

type Props = {
  readonly date: string;
  readonly readingTime: number;
  readonly hasArtificialMargin?: boolean;
};

export const Details: FC<Props> = ({
  date,
  readingTime,
  hasArtificialMargin = false,
}) => {
  const Tag = hasArtificialMargin ? StyledDetails : 'small';

  return (
    <Tag>
      {date} &bull; <ReadingTime readingTime={readingTime} />
    </Tag>
  );
};

const StyledDetails = styled.small`
  display: block;
  margin-bottom: 1.75rem;
  margin-top: -1.25rem;
`;

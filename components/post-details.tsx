import { ReadingTime } from 'components/reading-time';

type Props = {
  date: string;
  readingTime: number;
  className?: string;
};

export const PostDetails = ({ date, readingTime, className }: Props) => (
  <small className={className}>
    {date} &bull; <ReadingTime readingTime={readingTime} />
  </small>
);

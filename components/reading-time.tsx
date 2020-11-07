type Props = {
  readingTime: number;
};

export const ReadingTime = ({ readingTime }: Props) => {
  const cups = Math.round(readingTime / 5);
  return (
    <span>
      <span>
        {(cups > 5
          ? Array(Math.round(cups / Math.E)).fill('🍱')
          : Array(Math.max(1, cups)).fill('☕️')
        ).join(' ')}
      </span>
      &nbsp; &bull; &nbsp;
      {readingTime} min read
    </span>
  );
};

import classNames from 'classnames';

type Props = {
  readonly category: string;
};

export const Badge = ({ category }: Props) => (
  <span
    className={classNames('rounded-full px-4 py-1 text-sm font-medium', {
      'bg-blue-100 text-blue-800': category === 'React',
      'bg-amber-100 text-amber-800': category === 'Javascript',
      'bg-orange-100 text-orange-800': category === 'Rust',
    })}
  >
    {category}
  </span>
);

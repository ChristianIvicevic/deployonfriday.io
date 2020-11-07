import { Tag } from '@blueprintjs/core';
import classNames from 'classnames';

type Props = {
  category: string;
};

export const PostCategory = ({ category }: Props) => (
  <Tag
    className={classNames('post__category', {
      'post__category--java': category === 'Java',
      'post__category--javascript': category === 'Javascript',
      'post__category--react': category === 'React',
      'post__category--software-craft': category === 'Software Craft',
      'post__category--spring-boot': category === 'Spring Boot',
      'post__category--typescript': category === 'Typescript',
    })}
  >
    {category}
  </Tag>
);

import { POSTS_DIRECTORY_ROOT } from 'constants/configuration';
import { format, parseJSON } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import slugify from 'slugify';
import { readdirSyncRecursive } from 'utils/file-utils';
import { markdownToHtml } from 'utils/parsers';

const POSTS_DIRECTORY = path.join(process.cwd(), POSTS_DIRECTORY_ROOT);

type FrontMatterData = {
  readonly title: string;
  readonly description: string;
  readonly date: string;
  readonly category: string;
};

export const getAllPosts = async () =>
  (
    await Promise.all(
      readdirSyncRecursive(POSTS_DIRECTORY)
        .filter(fileName => fileName.endsWith('.md'))
        .map(async fileName => {
          const fileContents = fs.readFileSync(fileName, 'utf-8');

          const frontMatter = matter(fileContents);
          const { category, date, description, title } =
            frontMatter.data as FrontMatterData;

          return {
            date: format(parseJSON(date), 'LLLL d, yyyy'),
            title,
            description,
            category,
            slug: slugify(title, { strict: true, lower: true }),
            htmlContent: await markdownToHtml(frontMatter.content),
          };
        }),
    )
  ).sort((a, b) => (new Date(b.date) <= new Date(a.date) ? -1 : 1));

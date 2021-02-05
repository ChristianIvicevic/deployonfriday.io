import { decode } from 'he';
import parseNumericRange from 'parse-numeric-range';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkExternalLinks from 'remark-external-links';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import { getHighlighter, loadTheme } from 'shiki';
import unified from 'unified';

export const markdownToHtml = async (markdownContent: string) => {
  const highlighter = await getHighlighter({
    theme: await loadTheme('../../constants/shiki-themes/one-dark-pro.json'),
  });
  const basicHtmlContent = (
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkExternalLinks)
      .use(remark2rehype)
      .use(rehypeStringify)
      .use(rehypeSlug)
      .use(rehypeAutolinkHeadings, {
        content: {
          type: 'element',
          tagName: 'span',
          properties: {},
          children: [{ type: 'text', value: '#' }],
        },
        properties: { ariaHidden: true, class: 'anchor', tabIndex: -1 },
      })
      .process(markdownContent)
  ).toString();

  // At this point we just use regular expressions all the way to parse the
  // html to inject correct syntax highlighting. Maybe at some point when I'm
  // really bored or insane I might consider writing a plugin for the unified /
  // remark / rehype compiler chain we're already using.
  return basicHtmlContent.replace(
    /<pre><code class="language-(.+?)(?:\{(.+?)\})?">(.+?)<\/code><\/pre>/gs,
    (
      match,
      language: string,
      highlightRangeString: string,
      content: string,
    ) => {
      // 1st step: shiki
      const highlightedHtmlContent =
        highlighter.codeToHtml?.(decode(content), language) ?? match;

      // 2nd step: inject pseudo lines for empty lines
      const htmlContentWithEmptyLines = highlightedHtmlContent.replace(
        /\n\n/g,
        '\n<span class="line"></span>\n',
      );

      // 3rd step: prune shiki wrapper
      const codeBody =
        /<code>(.+?)<\/code>/s.exec(htmlContentWithEmptyLines)?.[1] ?? match;

      // 4th step: highlight lines
      const highlightRangeArray = parseNumericRange(highlightRangeString ?? '');
      let lineNumber = 1;
      const highlightedLines = codeBody.replace(
        /<span class="line">(.*?)<\/span>/gs,
        (lineMatch, lineContent: string) =>
          // eslint-disable-next-line no-plusplus
          highlightRangeArray.includes(lineNumber++)
            ? `<span class="shiki-highlight-line">${lineContent}</span>`
            : lineMatch,
      );

      // 5th step: remove erroneous newlines after highlighted lines
      const fixedNewLines = highlightedLines.replace(
        /(class="shiki-highlight-line"(?:.+?)<\/span>)\n/gs,
        '$1',
      );

      // 6th step: remove the empty pseudo lines to reduce size
      const minifiedHtmlContent = fixedNewLines.replace(
        /\n<span class="line"><\/span>\n/g,
        '\n\n',
      );

      return (
        `<div class="shiki-highlight">` +
        `<pre class="shiki language-${language}">` +
        `<code class="language-${language}">${minifiedHtmlContent}</code>` +
        `</pre>` +
        `</div>`
      );
    },
  );
};

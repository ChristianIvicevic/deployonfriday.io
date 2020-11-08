// Minimum TypeScript Version: 3.5
import { Node, Properties } from 'hast';
import { Plugin } from 'unified';

/**
 * Automatically add links to headings.
 */
declare const autolinkHeadings: Plugin<[autolinkHeadings.Options?]>;

// eslint-disable-next-line @typescript-eslint/no-redeclare
declare namespace autolinkHeadings {
  interface Options {
    /**
     * How to create links.
     *
     * @default 'prepend'
     */
    behavior?: 'prepend' | 'append' | 'wrap' | 'before' | 'after';

    /**
     * Extra properties to set on the link.
     *
     * @default {ariaHidden: true, tabIndex: -1}
     */
    properties?: Properties | Properties[];

    /**
     * `hast` nodes to insert in the link.
     *
     * @default { type: 'element', tagName: 'span', properties: {className: ['icon', 'icon-link']}, children: [] }
     */
    content?: Node | ((heading: Node) => Node[]);

    /**
     * `hast` node to wrap the heading and link with, if `behavior` is
     * `'before'` or `'after'`. There is no default.
     */
    group?: Node | ((heading: Node) => Node);
  }
}

export = autolinkHeadings;

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
body {
  font-family: ${props => props.theme.fonts.secondary};
  font-feature-settings: 'kern', 'liga', 'clig', 'calt';
  font-kerning: normal;
  font-size: 100%;
  font-weight: 400;
  line-height: 1.75;
}

a {
  box-shadow: 0 1px 0 0 currentColor;
  color: var(--textLink);
  text-decoration: none;

  &:hover,
  &:active {
    box-shadow: none;
    text-decoration: none;
  }

  &.anchor {
    box-shadow: none;
  }
}

h1 {
  font-family: ${props => props.theme.fonts.primary};
  font-weight: 700;
  line-height: 2.5rem;
  text-rendering: optimizeLegibility;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 3.5rem;

  .anchor span {
    visibility: hidden;
  }

  &:hover {
    .anchor span {
      visibility: visible;
    }
  }

  > code {
    font-size: inherit;
  }
}

blockquote {
  border-left: 0.4rem solid hsla(0, 0%, 0%, 0.9);
  border-left-color: inherit;
  font-size: 1.2rem;
  font-style: italic;
  line-height: 1.75rem;
  margin-left: -1.75rem;
  margin-right: 1.75rem;
  margin-top: 0;
  opacity: 0.8;
  padding-left: 1.5rem;
}

hr {
  background: var(--hr);
  border: none;
  height: 1px !important;
  margin-bottom: calc(1.75rem - 1px);
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
}

pre {
  font-size: 0.85rem;
  line-height: 1.75rem;
  margin: 0 0 1.75rem 0;
  padding: 0;
}

code[class*='language-'],
pre[class*='language-'] {
  background: #011627;
  color: white;
  font-family: ${props => props.theme.fonts.tertiary};
  font-feature-settings: normal;
  -webkit-font-smoothing: auto;
  hyphens: none;
  line-height: 1.5;
  margin-bottom: 0;
  tab-size: 4;
  text-align: left;
  white-space: pre;
  word-break: normal;
  word-spacing: normal;
  word-wrap: normal;
}

/* Code blocks */
pre[class*='language-'] {
  float: left;
  min-width: 100%;
  overflow: auto;
  padding: 1.3125rem;
}

pre[class*='language-']::-moz-selection {
  /* Firefox */
  background: hsl(207, 4%, 16%);
}

pre[class*='language-']::selection {
  /* Safari */
  background: hsl(207, 4%, 16%);
}

/* Text Selection colour */
pre[class*='language-']::-moz-selection,
pre[class*='language-'] ::-moz-selection {
  background: hsla(0, 0%, 100%, 0.15);
  text-shadow: none;
}

pre[class*='language-']::selection,
pre[class*='language-'] ::selection {
  background: hsla(0, 0%, 100%, 0.15);
  text-shadow: none;
}

code {
  font-size: 0.85rem;
}

:not(pre) > code {
  background: var(--inlineCode-bg);
  border-radius: 0.3em;
  color: var(--inlineCode-text);
  padding: 0.15em 0.2em 0.05em;
  white-space: normal;
}

p {
  margin-bottom: 1.75rem;

  & code {
    font-size: 1rem;
  }
}

strong {
  font-weight: 700;
}

ol,
ul {
  list-style-image: none;
  list-style-position: outside;
  margin-bottom: 1.75rem;
  margin-top: 0;
  padding: 0;
}

ul {
  list-style: disc;
}

ol {
  list-style: decimal;
}

li {
  margin-bottom: calc(1.75rem / 2);
}

table {
  border-collapse: collapse;
  font-size: 1rem;
  line-height: 1.75rem;
  margin: 0 0 1.75rem 0;
  padding: 0;
  width: 100%;
}

thead {
  text-align: left;
}

td,
th {
  border-bottom: 1px solid var(--hr);
  font-feature-settings: 'tnum';
  padding-bottom: calc(0.875rem - 1px);
  padding-left: 1.16667rem;
  padding-right: 1.16667rem;
  padding-top: 0.875rem;
  text-align: left;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    padding-right: 0;
  }
}

th {
  font-weight: 700;
}

@media only screen and (max-width: 480px) {
  ul,
  ol {
    margin-left: 1.75rem;
  }
  blockquote {
    margin-left: -1.3125rem;
    margin-right: 0;
    padding-left: 0.98438rem;
  }
}

// Github-like section anchor
.anchor {
  float: left;
  margin-left: -20px;
  padding-right: 4px;
}

.shiki-highlight {
  border-radius: 10px;
  margin-bottom: 1.75rem;
  margin-left: -1.3125rem;
  margin-right: -1.3125rem;
  overflow: auto;
}

@media (max-width: 672px) {
  .shiki-highlight {
    border-radius: 0;
  }
}

.shiki-highlight-line {
  background-color: #022a4b;
  border-left: 0.25em solid #2b95d6;
  display: block;
  margin-left: -1.3125rem;
  margin-right: -1.3125rem;
  padding-left: 1.25em;
  padding-right: 1em;
}
`;

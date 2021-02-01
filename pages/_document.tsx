import type { DocumentContext } from 'next/document';
import NextDocument, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class Document extends NextDocument {
  public static async getInitialProps(context: DocumentContext) {
    const stylesheet = new ServerStyleSheet();
    const originalRenderPage = context.renderPage;

    try {
      context.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props =>
            // eslint-disable-next-line react/jsx-props-no-spreading
            stylesheet.collectStyles(<App {...props} />),
        });

      const initialProps = await NextDocument.getInitialProps(context);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {stylesheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      stylesheet.seal();
    }
  }

  public render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=PT+Sans:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;

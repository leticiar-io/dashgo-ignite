import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Conentando a fonte popoins da cuboh */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          {/* Conentando os ico do site */}

          <link
            rel="icon"
            type="image/png"
            href="ico/logoIcon.png"
          />
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#ffffff" />
          <meta
            name="description"
            content="Troqueiro"
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

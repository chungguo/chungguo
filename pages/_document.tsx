import { GA_TRACKING_ID } from '../shared/constants';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh-cmn-Hans">
        <Head>
          <meta char-set="UTF-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="keywords" content="chungguo" />
          <meta name="description" content="I'm chungguo, coder, amateur photographer" />
          <meta name="copyright" content="chungguo" />
          <meta name="url" content="https://chungguo.me" />
          <meta name="og:title" content="chungguo" />
          <meta name="og:type" content="article" />
          <meta name="og:url" content="https://chungguo.me" />
          <meta name="og:image" content="https://chungguo.me/chungguo.jpg" />
          <meta name="og:site_name" content="chungguo" />
          <meta property="og:description" content="I'm chungguo, coder, amateur photographer" />
          <meta name="og:region" content="CN" />
          <meta name="og:country-name" content="CHN" />
          <link rel="canonical" href="https://chungguo.me/" data-baseprotocol="https:" data-basehost="chungguo.me" />
          <link rel="apple-touch-icon" sizes="180x180" href="./favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="./favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="./favicon/favicon-16x16.png" />
          <link rel="manifest" href="./site.webmanifest" />

          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />

          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_TRACKING_ID}', {page_path: window.location.pathname,});`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;
import Footer from 'chungguo/components/Footer';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh-cmn-Hans">
        <Head />
        <body className="dark:bg-black">
          <Main />
          <Footer />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;
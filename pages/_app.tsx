import Head from 'next/head';
import '../styles/index.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, maximum-scale=1" />
        <link rel="stylesheet" href="/assets/style/prism.css" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
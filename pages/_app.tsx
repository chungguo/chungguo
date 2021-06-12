import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'chungguo/styles/index.css';

NProgress.configure({ 
  showSpinner: true,
  spinnerSelector: '#__next'
});

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>chungguo</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no, maximum-scale=1, minimum-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
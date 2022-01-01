import { useEffect } from "react";
import Router from 'next/router';
import Head from 'chungguo/components/fundamental/Head';
import Header from 'chungguo/components/fundamental/Header';
import Footer from 'chungguo/components/fundamental/Footer';
import NProgress from 'nprogress';
import 'chungguo/styles/index.css';

NProgress.configure({
  showSpinner: true,
  spinnerSelector: '#__next'
});

const processStart = () => NProgress.start();
const processDone = () => NProgress.done();

export default function MyApp({ Component, pageProps, router }) {
  Router.events.on('routeChangeStart', processStart);
  Router.events.on('routeChangeComplete', processDone);
  Router.events.on('routeChangeError', processDone);

  useEffect(() => {
    Router.events.on('routeChangeStart', processStart);
    Router.events.on('routeChangeComplete', processDone);
    Router.events.on('routeChangeError', processDone);

    return () => {
      Router.events.off('routeChangeStart', processStart);
      Router.events.off('routeChangeComplete', processDone);
      Router.events.off('routeChangeError', processDone);
    }
  }, []);

  return (
    <>
      <Head asPath={router.asPath} />
      <article className="flex flex-col">
        <Header />
        <Component {...pageProps} router={router} />
        <Footer />
      </article>
    </>
  );
}

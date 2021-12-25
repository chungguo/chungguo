import { NextPage } from 'next';
import Head from 'next/head';
import { GA_TRACKING_ID } from 'chungguo/shared/constants';

interface Props {
  asPath?: string,
}

const MyHead: NextPage<Props> = ({ asPath = 'https://chungguo.me' }) => {
  const title = 'chungguo';
  const cover = 'https://chungguo.me/chungguo.jpg';
  const description = 'I\'m chungguo, coder, amateur photographer.';

  return (
    <Head>
      <title key="title">{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" key="viewport" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="keywords" content="chungguo" />
      <meta name="description" content={description} />
      <meta name="copyright" content="chungguo" />
      <meta name="url" content={asPath} />
      <meta name="og:title" content={title} />
      <meta name="og:type" content="article" />
      <meta name="og:url" content={asPath} />
      <meta name="og:image" content={cover} />
      <meta name="og:site_name" content="chungguo" />
      <meta property="og:description" content={description} />
      <meta name="og:region" content="CN" />
      <meta name="og:country-name" content="CHN" />
      <link rel="canonical" href={asPath} data-baseprotocol="https:" data-basehost="chungguo.me" />
      <link rel="apple-touch-icon" sizes="180x180" href="./favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="./favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="./favicon/favicon-16x16.png" />
      <link rel="manifest" href="./site.webmanifest" />
      <link rel="alternate" type="application/rss+xml" title="RSS feed for blog posts" href="https://chungguo.me/rss.xml" />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_TRACKING_ID}', {page_path: window.location.pathname,});gtag('set', {'user_id': 'USER_ID'});`,
        }}
      />
    </Head>
  )
};

export default MyHead;

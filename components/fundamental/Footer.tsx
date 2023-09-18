import Script from 'next/script';
import Link from 'chungguo/components/fundamental/Link';
import Social from 'chungguo/components/Social';
import By from 'chungguo/public/assets/common/by.svg';
import { GA_TRACKING_ID } from 'chungguo/shared/constants';

export default function Footer() {
  return (
    <footer className="w-full h-16 text-sm text-gray-400 border-gray-100 border-t dark:border-gray-800">
      <section className="max-w-7xl sm:flex mx-auto py-2 px-6 sm:px-6 justify-between">
        <section>
          <p>
            <span>Copyright 2014 - {new Date().getFullYear()}.</span><Link href="/">CHUNGGUO</Link> All Rights Reserved.
            Make with <Link href="https://nextjs.org">Next.js</Link>.
          </p>
          <p>
            <span className="inline-block mr-1 h-3 w-10"><By /></span>
            Except where otherwise noted, content on this site is licensed under a <Link href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</Link> license.
          </p>
        </section>
        <Social styleNames="mt-4 sm:mt-0" />
      </section>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="lazyOnload"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${GA_TRACKING_ID}', {page_path: window.location.pathname,});gtag('set', {'user_id': 'USER_ID'});`,
        }}
      />
    </footer>
  );
}

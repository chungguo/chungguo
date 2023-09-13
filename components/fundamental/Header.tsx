import { useCallback } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import DarkMode from 'chungguo/components/DarkMode';
import Chungguo from 'chungguo/public/chungguo.svg';
// import RightArrow from 'chungguo/public/assets/common/right-arrow.svg';

export default function Header() {
  const router = useRouter();

  const NavList = useCallback(() => {
    // const isHomePage = router.asPath === '/';
    // if (isHomePage) {
    //   return (
    //     <li>
    //       <Link href="/blog" passHref shallow>
    //         <a className="flex items-center px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 mx-2">
    //           <span>Blog</span>
    //           <span className="inline-block w-3 h-3 fill-current ml-2 -mr-1"><RightArrow /></span>
    //         </a>
    //       </Link>
    //     </li>
    //   );
    // }

    return (
      <>
        <li className="flex items-center px-5">
          <Link href="/about" passHref shallow>
            <a>ABOUT</a>
          </Link>
        </li>
        <li className="flex items-center px-5">
          <Link href="/rss.xml" passHref shallow>
            <a>RSS</a>
          </Link>
        </li>
      </>
    );
  // }, [router]);
  }, []);

  return (
    <header className="w-full bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center justify-between h-20 max-w-7xl mx-auto px-6">
        <section className="w-10 h-10 rounded-full dark:bg-white">
          <Link href="/" passHref shallow>
            <a><Chungguo /></a>
          </Link>
        </section>
        <nav className="flex flex-gro">
          <ul className="flex flex-grow flex-wrap items-center text-gray-600 dark:text-gray-300">
            <NavList />
            <li className="flex items-center px-5">
              <DarkMode />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

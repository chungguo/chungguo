import { useCallback } from 'react';
import Link from 'next/link';
import DarkMode from 'chungguo/components/DarkMode';
import Chungguo from 'chungguo/public/chungguo.svg';

export default function Header() {
  const NavList = useCallback(() => {
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

import Link from 'next/link';
import Chungguo from 'chungguo/public/chungguo.svg';

export default function Header() {
  return (
    <header className="w-full bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="w-10 h-10 rounded-full dark:bg-white">
            <Link href="/" passHref>
              <a><Chungguo /></a>
            </Link>
          </div>
          <nav className="flex flex-gro">
            <ul className="flex flex-grow justify-end flex-wrap items-center text-gray-600 dark:text-gray-300">
              <li className="flex items-center px-5">
                <Link href="/about" passHref>
                  <a>ABOUT</a>
                </Link>
              </li>
              <li className="flex items-center px-5">
                <Link href="/rss.xml" passHref>
                  <a>RSS</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

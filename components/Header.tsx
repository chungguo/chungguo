import Link from 'next/link';
import Chungguo from 'chungguo/public/chungguo.svg';

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="w-10 h-10 relative">
            <Link href="/" passHref>
              <a><Chungguo /></a>
            </Link>
          </div>
          <nav className="flex flex-grow">
            <ul className="flex flex-grow justify-end flex-wrap items-center text-gray-600">
              <li>
                <Link href="/blog" passHref>
                  <a className="px-5">ABOUT</a>
                </Link>
              </li>
              <li>
                <Link href="/blog" passHref>
                  <a className="px-5">RSS</a>
                </Link>
              </li>

            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

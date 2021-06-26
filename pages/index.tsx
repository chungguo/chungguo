import Link from 'next/link';
import Footer from 'chungguo/components/Footer';
import Hero from 'chungguo/public/assets/common/hero.svg';
import RightArrow from 'chungguo/public/assets/common/right-arrow.svg';
import Chungguo from 'chungguo/public/chungguo.svg';

export default function Index() {
  return (
    <article className="flex flex-col min-h-screen overflow-hidden">
      <header className="w-full bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="w-10 h-10 relative">
              <Link href="/" passHref>
                <a><Chungguo /></a>
              </Link>
            </div>
            <nav className="flex flex-grow">
              <ul className="flex flex-grow justify-end flex-wrap items-center">
                <li>
                  <Link href="/blog" passHref>
                    <a className="flex items-center px-4 py-1 rounded-md text-white bg-blue-500 hover:bg-blue-600 ml-3">
                      <span>Blog</span>
                      <span className="inline-block w-3 h-3 fill-current text-white flex-shrink-0 ml-2 -mr-1"><RightArrow /></span>
                    </a>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-grow flex flex-col justify-center">
        <section className="max-w-6xl md:max-w-3xl lg:max-w-5xl mx-auto px-8 sm:px-6">
          <div className="flex items-center justify-between flex-row">
            <h1 className="text-4xl l lg:text-5xl sm:text-3x font-extrabold font-custom leading-tighter tracking-tight mb-4 sm:whitespace-nowrap">
              <p className="text-3xl l lg:text-4xl sm:text-3xl mb-6">Hi there 🖖 .</p>
              <p>I&apos;m <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Chung Guo</span></p>
              <p className="block">A coder, amateur photographer.</p>
            </h1>
            <section className="hero-illustration w-0 md:w-40 lg:w-72">
              <Hero />
            </section>
          </div>
          <p className="text-base text-gray-500 sm:pr-10 md:pr-20">
            Currently, I am a front-end developer with React and Typescript as my main technology stack. But I&apos;ve also worked with Vue and developed large server-side projects in Nodejs for a few years. In my spare time, I often travel around the city I live in to make life more interesting.
          </p>
        </section>
      </main>
      <Footer />
    </article>
  )
}
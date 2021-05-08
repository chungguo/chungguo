import Head from 'next/head'
import Link from 'next/link'
import Social from '../components/Social'

const TITLE = 'chungguo'

export default function Index() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:image" content="https://chungguo.me/chungguo.jpg" />
        <meta property="og:url" content='https://chungguo.me/' />
        <meta property="og:description" content="I'm chungguo, coder, amateur photographer" />
      </Head>
      <main className="w-full h-screen flex items-center justify-center flex-col">
        <Link href="/blog">
          <article className="cursor-pointer flex flex-col items-center justify-center text-center flex-1 -mt-32">
            <img className="w-28 lg:w-40 md:32 inline rounded-full bg-gray-200" src="./chungguo.jpg" alt="avatar" />
            <h2 className="text-base font-semibold py-4 lg:text-4xl md:text-2xl">
              <p>👋 Hi, I'm chungguo</p>
              <p><span className="text-indigo-600">coder, </span>amateur photographer.</p>
            </h2>
          </article>
        </Link>
        <Social styleNames="h-20 justify-center" />
      </main>
    </>
  )
}
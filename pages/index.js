import Head from 'next/head'
import Link from 'next/link'
import Social from '../components/Social'

export default function Index() {
  return (
    <>
      <Head>
        <title>chungguo</title>
      </Head>
      <main className="w-full h-screen grid grid-rows-1 items-center justify-center">
        <Link href="/blog">
          <article className="cursor-pointer items-center justify-center text-center -mt-32">
            <img className="w-28 lg:w-40 md:32 inline rounded-full" src="./chungguo.jpg" alt="avatar" />
            <h2 className="text-base font-bold py-4 lg:text-4xl md:text-2xl">
              <span className="text-teal-500">CODER, </span>AMATEUR PHOTOGRAPHER.
            </h2>
          </article>
        </Link>
        <Social styleNames="py-8 justify-center" />
      </main>
    </>
  )
}
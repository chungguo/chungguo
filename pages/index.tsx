import Link from 'next/link';
import Social from 'chungguo/components/Social';

export default function Index() {
  return (
    <>
      <main className="h-screen flex justify-center flex-col">
        <article className="flex flex-col items-center justify-center text-center flex-1 -mt-32">
          <Link href="/blog">
            <img className="cursor-pointer w-28 lg:w-40 md:32 inline rounded-full bg-gray-200" src="./chungguo.jpg" alt="avatar" />
          </Link>
          <h2 className="text-3xl sm:text-4xl  lg:text-6xl  leading-none font-extrabold tracking-tight text-gray-900 mt-10 mb-8 sm:mt-14 sm:mb-10">
            <p>🖖 Hi, I'm chungguo</p>
            <p><span className="text-indigo-600">Coder, </span>Amateur Photographer.</p>
          </h2>
        </article>
        <Social styleNames="h-20 justify-center" />
      </main>
    </>
  )
}
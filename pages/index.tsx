import Link from 'next/link';
import Social from '../components/Social';

export default function Index() {
  return (
    <>
      <main className="h-screen flex justify-center flex-col">
        <article className="cursor-pointer flex flex-col items-center justify-center text-center flex-1 -mt-32">
          <Link href="/blog">
            <img className="w-28 lg:w-40 md:32 inline rounded-full bg-gray-200" src="./chungguo.jpg" alt="avatar" />
          </Link>
          <h2 className="text-base font-semibold py-4 lg:text-4xl md:text-2xl">
            <p>🖖 Hi, I'm chungguo</p>
            <p><span className="text-indigo-600">coder, </span>amateur photographer.</p>
          </h2>
        </article>

        <Social styleNames="h-20 justify-center" />
      </main>
    </>
  )
}
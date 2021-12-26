import Link from 'next/link';
import Clumsy from 'chungguo/public/assets/common/clumsy.svg';

function NotFound404() {
  return (
    <article className="not-found flex min-h-screen justify-center items-center flex-col p-10">
      <section className="max-w-1/2 w-80 dark:text-white" >
        <Clumsy />
      </section>
      <h1 className="text-center text-gray-500 font-custom mt-6">
        Oops..., although the page is not found, but the joy of life is worth exploring forever.
      </h1>
      <Link href="/" passHref>
        <a className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 mt-10">Go Home</a>
      </Link>
    </article>
  )
}

export default function NotFound() {
  return <NotFound404 />;
};

import Link from 'next/link';
import { Post } from 'chungguo/types/post';

export default function HeroPost(props: Post) {
  const { meta, slug } = props;
  const { title, cover, date, excerpt } = meta;

  return (
    <section className="grid sm:grid-cols-1 md:grid-cols-2 gap-x-12 my-12">
      <Link as={`/${slug}`} href="/[slug]">
        <img
          className="m-0 rounded-lg cursor-pointer object-cover w-full h-80 bg-gray-200"
          src={cover}
          alt={title}
        />
      </Link>
      <div className="mt-4">
        <Link as={`/${slug}`} href="/[slug]">
          <h3 className="lg:text-5xl md:text-3xl text-3xl font-semibold cursor-pointer">{title}</h3>
        </Link>
        <time className="mt-4 block" dateTime={date}>{date}</time>
        <p className="mt-4 text-gray-700 line-clamp-5">{excerpt}</p>
      </div>
    </section>
  )
}
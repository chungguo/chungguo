import Link from 'next/link';

export default function HeroPost(props) {
  const {
    title,
    coverImage,
    date,
    excerpt,
    slug,
  } = props;

  return (
    <section className="grid grid-cols-2 gap-x-12 my-12">
      <Link as={`/${slug}`} href="/[slug]">
        <img
          className="m-0 rounded-3xl cursor-pointer object-cover w-full h-72"
          src={coverImage}
          alt={title}
        />
      </Link>
      <div className="">
        <h3 className="text-5xl font-bold">
          <Link as={`/${slug}`} href="/[slug]">
            <a className="hover:underline">{title}</a>
          </Link>
        </h3>
        <time className="mt-4 block" dateTime={date}>{date}</time>
        <p className="mt-4 text-gray-700 line-clamp-5">{excerpt}</p>
      </div>
    </section>
  )
}
import Link from 'next/link';

function PostCard(props: {
  title: string,
  cover: string,
  date: string,
  excerpt: string,
  slug: string,
}) {
  const { slug, title, date, cover, excerpt } = props;

  return (
    <section>
      <Link as={`/${slug}`} href="/[slug]">
        <section className="cursor-pointer">
          <img src={cover} alt={title} className="object-cover rounded-lg w-full h-64 bg-gray-200" />
          <h3 className="line-clamp-1 text-2xl font-semibold mt-4">{title}</h3>
        </section>
      </Link>
      <time dateTime={date} className="block mt-1">{date}</time>
      <p className="line-clamp-3 mt-2 text-gray-700">{excerpt}</p>
    </section >
  )
}

export default function PostCards(props) {
  const { posts } = props;

  if (!Array.isArray(posts) || posts.length < 1) {
    return null;
  }

  return (
    <section className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-12 my-12">
      {
        posts.map(post => {
          const { slug } = post;
          return (
            <PostCard key={slug} {...post} />
          )
        })
      }
    </section>
  );
}
import Link from 'next/link';
import { Post } from 'chungguo/types/post';

interface PostCards {
  posts: Post[]
}

function PostCard(props: Post) {
  const { slug, meta } = props;
  const { title, date, cover, tag = [] } = meta;

  return (
    <Link as={`/post/${slug}`} href={`/post/[slug]`} passHref>
      <a className="cursor-pointer">
        <section className="border border-gray-100 dark:border-gray-800">
          <section className="px-6 py-4">
            <i className="block text-sm mb-2 text-gray-500">{tag.join(',')}</i>
            <h3 className="line-clamp-1 text-xl font-semibold dark:text-gray-300">{title}</h3>
            <time dateTime={date} className="block mt-1 text-sm text-gray-500">{date}</time>
          </section>
        </section >
      </a>
    </Link>
  )
}

export default function PostCards(props: PostCards) {
  const { posts } = props;

  if (!Array.isArray(posts) || posts.length < 1) {
    return null;
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 my-12">
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

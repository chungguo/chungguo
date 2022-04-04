import Link from 'next/link';
import { Post } from 'chungguo/types/post';

interface PostCards {
  posts: Post[]
}

function PostCard(props: Post) {
  const { slug, meta, content } = props;
  const { title, date, tag = [] } = meta;

  return (
    <section className="py-2">
      <Link as={`/post/${slug}`} href={`/post/[slug]`} passHref shallow>
        <h2 className="line-clamp-1 text-2xl font-semibold dark:text-gray-300 cursor-pointer">{title}</h2>
      </Link>
      <section className='flex justify-between'>
        <i className="block text-sm mb-2 text-gray-500">{tag.map(t => `#${t}`).join(',')}</i>
        <time dateTime={date} className="block mt-1 text-sm text-gray-500">{date}</time>
      </section>
      <p className='text-gray-500 line-clamp-2'>{content}</p>
    </section>
  )
}

export default function PostCards(props: PostCards) {
  const { posts } = props;

  if (!Array.isArray(posts) || posts.length < 1) {
    return null;
  }

  return (
    <ul className="flex flex-col gap-6 overflow-y-auto w-full my-6">
      {
        posts.map(post => {
          const { slug } = post;
          return (
            <PostCard key={slug} {...post} />
          )
        })
      }
    </ul>
  );
}

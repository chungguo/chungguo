import { getAllPosts } from 'chungguo/lib/post';
import PostCards from 'chungguo/components/PostCards';
import { Post } from 'chungguo/types/post';

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts
    },
  }
}

export default function BlogIndex(props: { posts: Post[] }) {
  const { posts } = props;

  return (
    <main className="flex-grow w-full max-w-2xl mx-auto p-4">
      <PostCards posts={posts} />
    </main>
  )
}

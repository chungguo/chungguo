import { getAllPosts } from 'chungguo/lib/post';
import PostCards from 'chungguo/components/PostCards';

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts
    },
  }
}

export default function BlogIndex(props) {
  const { posts } = props;

  return (
    <main className="max-w-7xl mx-auto px-5 sm:px-6">
      <PostCards posts={posts} />
    </main>
  )
}

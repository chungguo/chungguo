import { getAllPosts } from 'chungguo/lib/post';
import Header from 'chungguo/components/Header';
import Recommend from 'chungguo/components/Recommend';
import PostCards from 'chungguo/components/PostCards';
import Footer from 'chungguo/components/Footer';

export async function getStaticProps() {
  const allPosts = getAllPosts()

  return {
    props: {
      allPosts
    },
  }
}

export default function BlogIndex(props) {
  const { allPosts } = props;
  const recommendPosts = [];
  const otherPosts = [];

  allPosts.forEach(post => {
    !!post.meta?.recommend ? recommendPosts.push(post) : otherPosts.push(post);
  });

  return (
    <article className="bg-gray-50">
      <Header />
      <Recommend posts={recommendPosts} />
      <main className="max-w-7xl mx-auto px-5 sm:px-6">
        <PostCards posts={otherPosts} />
      </main>
      <Footer />
    </article>
  )
}
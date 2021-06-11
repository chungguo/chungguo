import Head from 'next/head';
import { getAllPosts } from 'chungguo/lib/post';
import Container from 'chungguo/components/Container';
import Header from 'chungguo/components/Header';
import HeroPost from 'chungguo/components/HeroPost';
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
  const [latest, ...otherPosts] = allPosts;

  return (
    <>
      <Head>
        <title>chungguo</title>
      </Head>
      <Header />
      <Container>
        <HeroPost {...latest} />
        <PostCards posts={otherPosts} />
      </Container>
      <Footer />
    </>
  )
}
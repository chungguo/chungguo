import Head from 'next/head'
import { getAllPosts } from '../lib/post'
import Container from '../components/Container'
import Header from '../components/Header'
import HeroPost from '../components/HeroPost'
import PostCards from '../components/PostCards'
import Footer from '../components/Footer'

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'cover',
    'excerpt',
  ])

  return {
    props: {
      allPosts
    },
  }
}

export default function BlogIndex(props) {
  const { allPosts } = props
  const [heroPost, ...otherPosts] = allPosts

  return (
    <>
      <Head>
        <title>chungguo</title>
      </Head>
      <Header />
      <Container>
        <HeroPost {...heroPost} />
        <PostCards posts={otherPosts} />
      </Container>
      <Footer />
    </>
  )
}
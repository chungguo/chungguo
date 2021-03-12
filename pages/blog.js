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
    'author',
    'coverImage',
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
    <Container>
      <Header />
      <HeroPost {...heroPost} />
      <PostCards posts={otherPosts} />
      <Footer />
    </Container>
  )
}
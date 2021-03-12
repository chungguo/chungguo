import { useRouter } from 'next/router'
import Head from 'next/head'
import PostPage from '../components/PostPage'
import Container from '../components/Container'
import ErrorPage from '../components/ErrorPage'
import { getAllPosts, getPostBySlug } from '../lib/post'
import markdownToHtml from '../lib/markdownToHtml'

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'content',
    'coverImage',
  ])

  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}


export default function Post({ post, morePosts, preview }) {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const { title, date } = post

  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={post?.ogImage?.url} />
      </Head>
      <PostPage 
        title={title}
        date={date}
        content={post.content}
      />
    </Container>
  )
}
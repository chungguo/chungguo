import Head from 'next/head'
import { useRouter } from 'next/router'

import Header from '../components/Header'
import PostPage from '../components/PostPage'
import Container from '../components/Container'
import ErrorPage from '../components/ErrorPage'
import Footer from '../components/Footer'

import { getAllPosts, getPostBySlug } from '../lib/post'
import markdownToHtml from '../lib/markdownToHtml'

import 'highlight.js/styles/github.css'

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
    'cover',
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

  const { title = '', date = '', excerpt = '', slug } = post

  return (
    <>
      <Header />
      <Container>
        <Head>
          <title>{title}</title>
          <meta property="og:type" content="article" />
          <meta property="og:title" content={title} />
          <meta property="og:image" content={post?.cover} />
          <meta property="og:url" content={`https://chungguo.me/${slug}`} />
          <meta property="og:description" content={excerpt} />
        </Head>
        <PostPage
          title={title}
          date={date}
          content={post.content}
        />
      </Container>
      <Footer />
    </>
  )
}
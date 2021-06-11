import Head from 'next/head';
import { useRouter } from 'next/router';

import Header from 'chungguo/components/Header';
import PostPage from 'chungguo/components/PostPage';
import Container from 'chungguo/components/Container';
import ErrorPage from 'chungguo/components/ErrorPage';
import Footer from 'chungguo/components/Footer';

import { getAllPosts, getPostBySlug } from 'chungguo/lib/post';

export async function getStaticPaths() {
  const posts = getAllPosts();
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
  const post = getPostBySlug(params.slug)
  return {
    props: {
      post
    },
  }
}

export default function Post({ post }) {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const { slug = '', meta, content } = post;
  const { title = '', cover = '', excerpt = '' } = meta;

  return (
    <>
      <Header />
      <Container>
        <Head>
          <title>{title}</title>
          <meta property="og:type" content="article" />
          <meta property="og:title" content={title} />
          <meta property="og:image" content={cover} />
          <meta property="og:url" content={`https://chungguo.me/${slug}`} />
          <meta property="og:description" content={excerpt} />
        </Head>
        <PostPage slug={slug} meta={meta} content={content} />
      </Container>
      <Footer />
    </>
  )
}

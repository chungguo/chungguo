import Head from 'next/head';
import { useRouter } from 'next/router';

import Seo from 'chungguo/components/Seo';
import Header from 'chungguo/components/Header';
import PostPage from 'chungguo/components/PostPage';
import ErrorPage from 'chungguo/components/ErrorPage';

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
      <Head>
        <Seo title={title} cover={cover} url={`https://chungguo.me/${slug}`} description={excerpt}/>
      </Head>
      <PostPage slug={slug} meta={meta} content={content} />
    </>
  )
}

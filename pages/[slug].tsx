import Head from 'next/head';
import { useRouter } from 'next/router';

import Header from '../components/Header';
import PostPage from '../components/PostPage';
import Container from '../components/Container';
import ErrorPage from '../components/ErrorPage';
import Footer from '../components/Footer';

import { getAllPosts, getPostBySlug } from '../lib/post';

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
  const { title = '', cover = '', excerpt = '', mathJax = false } = meta;

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
          {
            mathJax && (
              <>
                <script
                  dangerouslySetInnerHTML={{
                    __html: `MathJax={tex:{inlineMath:[["$","$"],["\\(","\\)"]],displayMath:[["$$","$$"],["\\[","\\]"]],processEscapes:!0}};`
                  }}
                />
                <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
                <script type="text/javascript" id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>
              </>
            )
          }
        </Head>
        <PostPage slug={slug} meta={meta} content={content} />
      </Container>
      <Footer />
    </>
  )
}

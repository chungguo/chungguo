import { useRouter } from 'next/router';
import PostPage from 'chungguo/components/PostPage';
import ErrorPage from 'chungguo/components/fundamental/ErrorPage';
import { GetStaticPropsContext } from 'next';

import { getAllPosts, getPostBySlug, writeIssueAsMarkdownFile } from 'chungguo/lib/post';
import { Post } from 'chungguo/types/post';

export async function getStaticPaths() {
  const posts = await getAllPosts();

  return {
    paths: posts.map(post => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  }
}


export async function getStaticProps({ params }: GetStaticPropsContext<{ slug: string }>) {
  await writeIssueAsMarkdownFile();
  const post = getPostBySlug(params!.slug)
  return {
    props: {
      post
    },
  }
}

export default function Post({ post }: { post: Post }) {
  const router = useRouter()

  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const { slug = '', meta, content } = post;

  return (
    <PostPage slug={slug} meta={meta} content={content} />
  )
}

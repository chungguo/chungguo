import fs from 'fs';
import { Post } from 'chungguo/types/post';
import { getAllPosts, writeIssueAsMarkdownFile } from 'chungguo/lib/post';
import PostCards from 'chungguo/components/PostCards';
import { SELF_BREIF } from 'chungguo/shared/constants';

const generateRssItem = (post: Post): string => `
  <item>
    <title>${post.meta.title}</title>
    <link>https://chungguo.me/${post.slug}</link>
    <guid>https://chungguo.me/${post.slug}</guid>
    <description><![CDATA[${post.meta.excerpt}]]></description>
    <pubDate>${new Date(post.meta.date).toUTCString()}</pubDate>
  </item>
`;

const generateRss = (posts: Post[]): string => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>chungguo's blog</title>
      <link>https://chungguo.me</link>
      <description>Hi there 🖖 .I'm chungguo, A coder, amateur photographer. ${SELF_BREIF}</description>
      <language>zh-cmn-Hans</language>
      <pubDate>${new Date(posts[0].meta.date).toUTCString()}</pubDate>
      <lastBuildDate>${new Date(posts[0].meta.date).toUTCString()}</lastBuildDate>
      <docs>https://chungguo.me/rss.xml</docs>
      <managingEditor>chungguo@outlook.com</managingEditor>
      <webMaster>chungguo@outlook.com</webMaster>
      <atom:link href="https://chungguo.me/rss.xml" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join('')}
    </channel>
  </rss>
`;

export async function getStaticProps() {
  await writeIssueAsMarkdownFile();
  const posts = getAllPosts()
  const rss = generateRss(posts as Post[]);

  fs.writeFileSync('./public/rss.xml', rss);

  return {
    props: {
      posts
    },
  }
}

export default function BlogIndex(props) {
  const { posts } = props;

  return (
    <main className="max-w-7xl mx-auto px-5 sm:px-6">
      <PostCards posts={posts} />
    </main>
  )
}

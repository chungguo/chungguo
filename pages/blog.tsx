import fs from 'fs';
import { getAllPosts } from 'chungguo/lib/post';
import Header from 'chungguo/components/Header';
import Recommend from 'chungguo/components/Recommend';
import PostCards from 'chungguo/components/PostCards';
import { Post } from 'chungguo/types/post';
import { SELF_BREIF } from 'chungguo/shared/constants';

const generateRssItem = (post: Post): string => `
  <item>
    <guid>https://chungguo.me/${post.slug}</guid>
    <title>${post.meta.title}</title>
    <link>https://chungguo.me/${post.slug}</link>
    <description><![CDATA[${post.content}]]></description>
    <pubDate>${new Date(post.meta.date).toUTCString()}</pubDate>
  </item>
`;

const generateRss = (posts: Post[]): string => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>chungguo.me</title>
      <link>https://chungguo.me</link>
      <description>Hi there 🖖 .I'm chungguo, A coder, amateur photographer. ${SELF_BREIF}</description>
      <language>zh-CN</language>
      <lastBuildDate>${new Date(posts[0].meta.date).toUTCString()}</lastBuildDate>
      <atom:link href="https://chungguo.me/rss.xml" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join('')}
    </channel>
  </rss>
`;


export async function getStaticProps() {
  const allPosts = getAllPosts()
  const rss = generateRss(allPosts as Post[]);

  fs.writeFileSync('./public/rss.xml', rss);

  return {
    props: {
      allPosts
    },
  }
}

export default function BlogIndex(props) {
  const { allPosts } = props;
  const recommendPosts = [];
  const otherPosts = [];

  allPosts.forEach((post: Post) => {
    !!post.meta?.recommend ? recommendPosts.push(post) : otherPosts.push(post);
  });

  return (
    <article className="bg-gray-50">
      <Header />
      <Recommend posts={recommendPosts} />
      <main className="max-w-7xl mx-auto px-5 sm:px-6">
        <PostCards posts={otherPosts} />
      </main>
    </article>
  )
}
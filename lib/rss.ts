import { writeFile } from 'fs/promises';
import { Post } from 'chungguo/types/post';
import { SELF_BREIF, RSS_PATH } from 'chungguo/shared/constants';


const generateRssItem = (post: Post): string => `
  <item>
    <title>${post.meta.title}</title>
    <link>https://chungguo.me/${post.slug}</link>
    <guid>https://chungguo.me/${post.slug}</guid>
    <description><![CDATA[]]></description>
    <pubDate>${new Date(post.meta.date).toUTCString()}</pubDate>
  </item>
`;

export const generateRss = async (posts: Post[]) => {
  const content = `
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

  await writeFile(RSS_PATH, content, 'utf-8');
};

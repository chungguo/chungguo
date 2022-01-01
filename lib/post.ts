import { join } from 'path';
import { readFileSync, readdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import dayjs from 'dayjs';
import matter from 'gray-matter';
import { Issue, Post } from 'chungguo/types/post';
import { getAllIssues } from 'chungguo/lib/github';
import { generateRss } from 'chungguo/lib/rss';
import { POST_DIRECTORY } from 'chungguo/shared/constants';

/**
 *  读取 md 文件，头部信息会放在 data 字段，正文存储在 content 中
 * {
 *    data: { title: '', date: '' },
 *    content: ''
 * }
 */
export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(POST_DIRECTORY, `${realSlug}.md`);
  const fileContents = readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: data,
    content,
  } as Post;
}

export async function getAllPosts() {
  const issues = await getAllIssues({
    labels: ['post'],
  });

  await writeIssueAsMarkdownFile(issues);

  const posts = readdirSync(POST_DIRECTORY)
    .filter(filename => filename.endsWith('.md'))
    .map(slug => getPostBySlug(slug));

  await generateRss(posts);

  return posts;
}

export async function writeIssueAsMarkdownFile(issues: Issue[] = []) {
  await Promise.all(issues.map(async (issue: Issue) => {
    const { id, number, title, labels, created_at, body, html_url } = issue;
    const filePath = join(POST_DIRECTORY, `${number}.md`);
    const tagName = labels.map(label => label.name).filter(name => name !== 'post');
    const fileContent = [
      '---',
      `title: '${title}'`,
      `date: '${dayjs(created_at).format('YYYY-MM-DD HH:mm:ss')}'`,
      `tag: [${tagName}]`,
      `cover: '//picsum.photos/seed/${id}/300/200'`,
      `issue: '${html_url}'`,
      '---',
      `${body}`,
    ].join('\r\n');
    return writeFile(filePath, fileContent);
  }));
}

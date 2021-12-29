import { join } from 'path';
import { readFileSync, readdirSync } from 'fs';
import { writeFile } from 'fs/promises';
import dayjs from 'dayjs';
import matter from 'gray-matter';
import { getAllIssues } from 'chungguo/lib/github';
import { Issue } from 'chungguo/types/post';
import { POST_DIRECTORY } from 'chungguo/lib/constants';

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
  console.log('fullPath: ', fullPath);
  const fileContents = readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: data,
    content,
  };
}

export function getAllPosts() {
  return readdirSync(POST_DIRECTORY)
    .filter(filename => filename.endsWith('.md'))
    .map(slug => getPostBySlug(slug));
}

export async function writeIssueAsMarkdownFile() {
  const issues = await getAllIssues({
    labels: ['post'],
  });

  await writeFile(join(POST_DIRECTORY, 'issues.json'), JSON.stringify(issues), 'utf-8');

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

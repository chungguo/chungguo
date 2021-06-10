import matter from 'gray-matter';
import { join } from 'path';
import { readFileSync, readdirSync } from 'fs';

const postsDirectory = join(process.cwd(), './_posts');

/** 读取_post目录下所有md文件名称 */
export function getPostSlugs() {
  return readdirSync(postsDirectory);
}

/**
 *  读取 md 文件，头部信息会放在 data 字段，正文存储在 content 中
 * {
 *    data: { title: '', date: '' },
 *    content: ''
 * }
 */
export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: data,
    content,
  };
}

export function getAllPosts() {
  return getPostSlugs()
    .map(slug => getPostBySlug(slug))
    .filter(post => post.meta.draft !== true)
    .sort((pre, next) => {
      const preDate = new Date(pre.meta.date).valueOf();
      const nextDate = new Date(next.meta.date).valueOf();
      return preDate > nextDate ? -1 : 1
    });
}
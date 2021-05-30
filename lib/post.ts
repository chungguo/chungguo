import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';

const postsDirectory = join(process.cwd(), './_posts');

/** 读取_post目录下所有md文件名称 */
export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

/**
 *  读取 md 文件，头部信息会放在 data 字段，正文存储在 content 中
 * {
 *    data: { title: '', date: '' },
 *    content: ''
 * }
 */
export function getPostBySlug(slug: string, fields = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  return fields.reduce((items, field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }

    return items;
  }, {});
}

export function getAllPosts(fields: string[] = []) {
  return getPostSlugs().map((slug) => getPostBySlug(slug, fields))
    .filter(post => post.draft !== true)
    .sort((pre, next) => (new Date(pre.date).valueOf() > new Date(next.date).valueOf() ? -1 : 1))
}
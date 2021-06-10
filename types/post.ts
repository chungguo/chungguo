export interface Meta {
  title: string,
  date: string,
  cover: string,
  excerpt: string,
  tag: string[],
  mathJax?: boolean,
  draft?: boolean
}

export interface Post {
  content: string,
  meta: Meta,
  slug: string,
}
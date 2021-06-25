export interface Meta {
  title: string,
  date: string,
  cover: string,
  excerpt: string,
  tag: string[],
  recommend?: boolean,
  draft?: boolean
}

export interface Post {
  content: string,
  meta: Meta,
  slug: string,
}
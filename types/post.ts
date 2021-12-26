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

export interface Label {
  id: number,
  name: string,
}

export interface Issue {
  id: number,
  number: number,
  title: string,
  labels: Label[],
  updated_at: string,
  body: string,
  html_url: string,
}

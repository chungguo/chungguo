import gfm from 'remark-gfm';
import footnotes from 'remark-footnotes';
import ReactMarkdown from 'react-markdown';

import Issue from './Issue';
import CodeRender from './CodeRender';
import ImageRender from './ImageRender';
import markdownStyles from '../styles/markdown.module.css';

import { Post } from '../types/post';

export default function PostPage(props: Post) {
  const { content, meta } = props;
  const { title, date } = meta;

  return (
    <article className="py-4 line-numbers max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <time className="block mt-4 text-gray-500 text-base" dateTime={date}>{date}</time>
      <ReactMarkdown
        className={markdownStyles['markdown']}
        remarkPlugins={[
          gfm,
          footnotes,
        ]}
        children={content}
        components={{
          code: CodeRender,
          img: ImageRender,
        }}
      />
      <Issue />
    </article>
  )
}
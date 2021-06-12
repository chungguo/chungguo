import React from 'react';
import gfm from 'remark-gfm';
import toc from '@jsdevtools/rehype-toc';
import footnotes from 'remark-footnotes';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import slug from 'rehype-slug';
import rehypeKatex from 'rehype-katex';

import Issue from 'chungguo/components/Issue';
import CodeRender from 'chungguo/components/CodeRender';
import ImageRender from 'chungguo/components/ImageRender';
import BlockquoteRender from 'chungguo/components/BlockquoteRender';
import markdownStyles from 'chungguo/styles/markdown.module.css';
import { Post } from 'chungguo/types/post';

import 'katex/dist/katex.min.css'

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
          remarkMath,
        ]}
        rehypePlugins={[
          slug,
          toc,
          rehypeKatex
        ]}
        children={content}
        components={{
          code: CodeRender,
          img: ImageRender,
          blockquote: BlockquoteRender,
        }}
      />
      <Issue />
    </article>
  )
}
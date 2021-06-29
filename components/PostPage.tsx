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
  const { title, date, tag = [] } = meta;

  return (
    <article className="max-w-4xl mx-auto px-6 sm:px-6 py-6 line-number dark:text-gray-300">
      <h1 className="text-3xl mb-4 font-semibold">{title}</h1>
      <i className="block text-sm text-gray-500">{tag.join(',')}</i>
      <time className="block text-sm text-gray-500" dateTime={date}>{date}</time>
      <ReactMarkdown
        className={`${markdownStyles['markdown']} markdown`}
        remarkPlugins={[
          gfm,
          footnotes,
          remarkMath,
        ]}
        rehypePlugins={[
          slug,
          toc,
          [rehypeKatex, {
            strict: (errorCode: string) => {
              if (errorCode === 'unicodeTextInMathMode') {
                return 'ignore';
              }
              return 'warn';
            }
          }]
        ]}
        components={{
          code: CodeRender,
          img: ImageRender,
          blockquote: BlockquoteRender,
        }}
      >
        {content}
      </ReactMarkdown>
      <Issue />
    </article>
  )
}
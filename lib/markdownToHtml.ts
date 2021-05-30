import unified from 'unified';
import parser from 'remark-parse';
import rehype from 'remark-rehype';
import html from 'rehype-stringify';
import raw from 'rehype-raw';
import hljs from 'rehype-highlight';
import gfm from 'remark-gfm';
import footnotes from 'remark-footnotes';

export default async function markdownToHtml(markdown) {
  return new Promise((resolve) => {
    unified()
      .use(parser)
      .use(rehype, { 
        allowDangerousHtml: true 
      })
      .use(raw)
      .use(gfm)
      .use(footnotes)
      .use(hljs)
      .use(html)
      .process(markdown, (err, file) => {
        resolve(String(file))
      })
  })
}
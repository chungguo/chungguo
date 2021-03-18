import remark from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
import math from 'remark-math'
import hljs from 'remark-highlight.js'
import katex from 'rehype-katex'
import toc from 'remark-toc'
import footnotes from 'remark-footnotes'

export default async function markdownToHtml(markdown) {
  const result = await remark()
    .use(toc)
    .use(html)
    .use(footnotes)
    .use(gfm)
    .use(hljs)
    .use(math)
    .use(katex)
    .process(markdown)

  return result.toString()
}
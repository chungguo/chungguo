import remark from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';
import footnotes from 'remark-footnotes';

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(gfm)
    .use(footnotes)
    .use(html)
    .process(markdown);
  return result.toString();
}
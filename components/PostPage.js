import Header from './Header'
import Footer from './Footer'

import markdownStyles from '../styles/markdown.module.css'

export default function PostPage(props) {
  const { content, title, date } = props

  return (
    <article className="mx-auto">
      <Header />
      <section className="mt-5">
        <h1 className="text-3xl font-bold">{title}</h1>
        <time className="block mt-4" dateTime={date}>{date}</time>
        <div
          className={markdownStyles['markdown']}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </section>
      <Footer />
    </article>
  )
}
import Footer from './Footer'
import Issue from './Issue'
import markdownStyles from '../styles/markdown.module.css'

export default function PostPage(props) {
  const { content, title, date } = props

  return (
    <article className="py-4">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <time className="block mt-4 text-gray-500 text-base" dateTime={date}>{date}</time>
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
      <Issue />
      <Footer />
    </article>
  )
}
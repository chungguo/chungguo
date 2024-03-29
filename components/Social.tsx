import Link from 'next/link';
import TwitterSVG from 'chungguo/public/assets/common/twitter.svg';
import GithubSVG from 'chungguo/public/assets/common/github.svg';
import InstagramSVG from 'chungguo/public/assets/common/instagram.svg';
import BlogSVG from 'chungguo/public/assets/common/blog.svg';
interface Props {
  styleNames?: string,
  exclude?: string[],
}

const Blog = () => {
  return (
    <Link href="/blog" passHref shallow>
      <a className='transform hover:scale-125 block w-6 h-6 hover:text-blue-600 dark:hover:text-gray-50'>
        <BlogSVG />
      </a>
    </Link>
  )
}

const Instagram = () => {
  return (
    <Link href="https://www.instagram.com/chungguo.gc/" passHref shallow>
      <a target="_blank" rel="noreferrer" className='transform hover:scale-125 block w-6 h-6 hover:text-blue-600 dark:hover:text-gray-50'>
        <InstagramSVG />
      </a>
    </Link>
  )
}

const Twitter = () => {
  return (
    <Link href="https://twitter.com/chungguo_me/" passHref shallow>
      <a target="_blank" rel="noreferrer" className='transform hover:scale-125 block w-6 h-6 hover:text-blue-600 dark:hover:text-gray-50'>
        <TwitterSVG />
      </a>
    </Link>
  )
}

const Github = () => {
  return (
    <Link href="https://github.com/chungguo/chungguo.github.io" passHref shallow>
      <a target="_blank" rel="noreferrer" className='transform hover:scale-125 block w-6 h-6 hover:text-blue-600 dark:hover:text-gray-50'>
        <GithubSVG />
      </a>
    </Link>
  )
}

export default function Social(props: Props) {
  const { styleNames = '', exclude = [] } = props;

  const Icons: Record<string, React.ReactElement> = {
    'blog': <Blog key="blog" />,
    'twitter': <Twitter key="twitter" />,
    'instagram': <Instagram key="instagram" />,
    'github': <Github key="github" />,
  };

  return (
    <section className={`flex items-center space-x-4 ${styleNames}`}>
      {
        Object.keys(Icons).filter(name => !exclude.includes(name)).map(v => {
          return Icons[v];
        })
      }
    </section>
  )
}

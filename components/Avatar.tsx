import Link from 'next/link';
import Chungguo from 'chungguo/public/chungguo.svg';

export default function Avatar() {
  return (
    <Link href="/" passHref>
      <a>
        <section className="flex items-center cursor-pointer">
          <span className="w-8 mx-4"><Chungguo /></span>
          <span className="font-semibold text-base">CHUNGGUO</span>
        </section>
      </a>
    </Link>
  )
}
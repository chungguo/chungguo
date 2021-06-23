import Link from 'next/link';

export default function Avatar() {
  return (
    <Link href="/" passHref>
      <section className="flex items-center cursor-pointer">
        <img src="./chungguo.jpg" className="cover w-8 rounded-full py-4 mx-4" />
        <span className="font-semibold text-base">CHUNGGUO</span>
      </section>
    </Link>
  )
}
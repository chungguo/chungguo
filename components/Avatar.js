import Link from 'next/link'

export default function Avatar() {
  return (
    <Link href="/">
      <section className="flex items-center cursor-pointer">
        <img src="./chungguo.jpg" className="cover w-0 rounded-full py-4 px-2 md:w-10" />
        <span className="font-bold text-base">CHUNGGUO</span>
      </section>
    </Link>
  )
}
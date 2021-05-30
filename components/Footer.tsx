import Link from './Link';

export default function Footer() {
  return (
    <footer className="text-sm text-center text-gray-400 p-4 bg-white border-t">
      <p>
        <span>Copyright 2014 - {new Date().getFullYear()}.</span><Link href="/"> CHUNGGUO </Link> All Rights Reserved.
        Make with <Link href="https://nextjs.org">Next.js</Link>.
      </p>
      <p>
        <img className="inline-block mr-1 h-3" src="/assets/common/by.svg" />
        Except where otherwise noted, content on this site is licensed under a
        <Link href="https://creativecommons.org/licenses/by/4.0/"> CC BY 4.0 </Link>
        license.
      </p>
    </footer>
  )
}
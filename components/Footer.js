export default function Footer() {
  return (
    <footer className="text-sm text-center text-gray-400 p-4 bg-white border-t">
      <p>
        <span>Copyright 2014 - {new Date().getFullYear()}.</span>
        <a href="/"> CHUNGGUO </a> All Rights Reserved.
        Make with <a href="https://nextjs.org" target="_blank">Next.js</a>.
      </p>
      <p>
        <img className="inline-block mr-1 h-3" src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by.svg" />
        Except where otherwise noted, content on this site is licensed under a
        <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"> CC BY 4.0 </a>
        license.
      </p>
    </footer>
  )
}
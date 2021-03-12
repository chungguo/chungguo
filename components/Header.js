import Social from './Social'
import Avatar from './Avatar'

export default function Header() {
  return (
    <header className="sticky w-full h-16 top-0 z-40 flex bg-white border-b">
      <Avatar />
      <Social styleNames="justify-end flex-1" />
    </header>
  )
}

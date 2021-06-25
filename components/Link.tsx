import Link from 'next/link';

interface Props {
  href: string,
  children: React.ReactChild,
}

export default function CustomLink(props: Props) {
  const { href, children } = props;
  return (
    <Link passHref href={href}>
      <a className="text-black font-semibold bg-underline-blue" target="_blank" rel="noreferrer">
        {children}
      </a>
    </Link>
  );
}
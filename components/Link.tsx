import Link from 'next/link';

interface Props {
  href: string,
  children: React.ReactChild,
}

export default function CustomLink(props: Props) {
  const { href, children } = props;
  return (
    <Link passHref href={href}>
      <span className="text-black dark:text-gray-300 font-semibold bg-underline-blue">
        {children}
      </span>
    </Link>
  );
}

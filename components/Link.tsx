export default function Link(props) {
  return (
    <a
      className="text-blue-600 font-semibold"
      target="_blank"
      href={props.href}
      rel="noreferrer"
    >
      {props.children}
    </a>
  );
}
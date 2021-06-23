export default function Link(props) {
  return (
    <a
      className="text-indigo-600 font-semibold"
      target="_blank"
      href={props.href}
      rel="noreferrer"
    >
      {props.children}
    </a>
  );
}
export default function ErrorPage (props) {
  const { statusCode } = props;
  return <p>{statusCode}</p>
}
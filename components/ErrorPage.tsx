export default function ErrorPage(props: {
  statusCode: number,
}) {
  const { statusCode } = props;
  return <p>{statusCode}</p>
}
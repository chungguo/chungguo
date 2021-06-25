interface Props {
  url?: string,
  title?: string,
  image?: string,
  description?: string,
}

export default function Seo(props: Props) {
  const {
    url = 'https://chungguo.me',
    title = 'chungguo',
    image = 'https://chungguo.me/chungguo.jpg',
    description = 'I\'m chungguo, coder, amateur photographer.',
  } = props;

  return (
    <>
      <meta char-set="UTF-8" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <meta name="keywords" content="chungguo" />
      <meta name="description" content={description} />
      <meta name="copyright" content="chungguo" />
      <meta name="url" content={url} />
      <meta name="og:title" content={title} />
      <meta name="og:type" content="article" />
      <meta name="og:url" content={url} />
      <meta name="og:image" content={image} />
      <meta name="og:site_name" content="chungguo" />
      <meta property="og:description" content={description} />
      <meta name="og:region" content="CN" />
      <meta name="og:country-name" content="CHN" />
      <link rel="canonical" href={url} data-baseprotocol="https:" data-basehost="chungguo.me" />
      <link rel="apple-touch-icon" sizes="180x180" href="./favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="./favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="./favicon/favicon-16x16.png" />
      <link rel="manifest" href="./site.webmanifest" />
    </>
  )
}
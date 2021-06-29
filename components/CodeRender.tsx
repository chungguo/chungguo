import classNames from 'classnames';
import { Prism } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function CodeRender(props) {
  const { className, node, inline, ...other } = props;

  if (inline) {
    return <code {...other} inline="true" className={classNames(className, {
      'bg-gray-100 dark:bg-gray-500 dark:text-gray-300 px-2 py-1 rounded-md': inline,
    })} />
  }

  const language = className?.replace('language-', '') || '';
  const [child] = node.children;

  return (
    <Prism
      language={language}
      style={okaidia}
      showLineNumbers={true}
      wrapLines={true}
    >
      {child?.value}
    </Prism>
  );
}
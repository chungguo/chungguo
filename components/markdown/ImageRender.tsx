import Image from 'rc-image';
import { PropsWithChildren } from 'react';
import 'rc-image/assets/index.css';

export default function ImageRender(props: PropsWithChildren<Record<string, any>>) {
  return <Image
    preview={{
      icons: {
        'close': '关闭',
        'zoomIn': '放大',
        'zoomOut': '缩小',
        'rotateLeft': '左旋',
        'rotateRight': '右旋',
      }
    }}
    src={props.src}
    alt={props.alt}
  />
}

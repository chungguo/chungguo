import Link from 'next/link';
interface Props {
  styleNames: string,
  exclude?: string[],
}

const Blog = () => {
  return <Link href="/blog">
    <svg width="20" height="20" fill="currentColor" className="transform hover:scale-125">
      <path fill="none" d="M-1-1h22v22H-1z" />
      <g>
        <g stroke="null">
          <path d="M12.066 11.03h-3.5a.592.592 0 0 0-.595.591c0 .321.266.592.595.592h3.5a.59.59 0 1 0 0-1.183zM8.566 8.66h1.722c.329 0 .596-.27.596-.595a.596.596 0 0 0-.596-.594H8.566a.595.595 0 0 0 0 1.19z" />
          <path d="M10 .815A9.184 9.184 0 0 0 .815 10 9.184 9.184 0 0 0 10 19.185 9.184 9.184 0 0 0 19.185 10 9.184 9.184 0 0 0 10 .815zm5.203 10.852c-.01 1.706-1.398 3.103-3.107 3.103h-3.57a3.114 3.114 0 0 1-3.106-3.103V8.041c0-1.71 1.397-3.11 3.106-3.11H10.7c.802.096 1.97.783 2.4 1.697.118.256.18.296.278 1.056.054.391.08.68.255.84.246.224 1.16.074 1.34.215l.14.108.082.171.028.137-.02 2.512z" />
        </g>
      </g>
    </svg>
  </Link>
}

const Instagram = () => {
  return (
    <a href="https://www.instagram.com/chungguo.gc/" target="_blank" className="transform hover:scale-125">
      <svg width="20" height="20" fill="currentColor">
        <path fill="none" d="M-1-1h22v22H-1z" />
        <g>
          <path stroke="null" d="M10 1.104c4.91 0 8.896 3.986 8.896 8.896S14.91 18.896 10 18.896 1.104 14.91 1.104 10 5.09 1.104 10 1.104zm0 3.336c-1.51 0-1.7.006-2.292.033-.592.027-.996.121-1.35.259a2.726 2.726 0 0 0-.985.641c-.31.31-.5.62-.641.985-.138.354-.232.758-.259 1.35C4.446 8.3 4.44 8.49 4.44 10c0 1.51.006 1.7.033 2.292.027.592.121.996.259 1.35.142.366.332.676.641.985.31.31.62.5.985.641.354.138.758.232 1.35.259.593.027.782.033 2.292.033 1.51 0 1.7-.006 2.292-.033.592-.027.996-.121 1.35-.259.366-.142.676-.332.985-.641.31-.31.5-.62.641-.985.138-.354.232-.758.259-1.35.027-.593.033-.782.033-2.292 0-1.51-.006-1.7-.033-2.292-.027-.592-.121-.996-.259-1.35a2.726 2.726 0 0 0-.641-.985c-.31-.31-.62-.5-.985-.641-.354-.138-.758-.232-1.35-.259C11.7 4.446 11.51 4.44 10 4.44zm0 1.002c1.485 0 1.66.005 2.247.032.542.025.836.115 1.032.191.26.101.445.222.64.416.194.195.315.38.416.64.076.196.166.49.19 1.032.028.587.033.762.033 2.247 0 1.485-.005 1.66-.032 2.247-.025.542-.115.836-.191 1.032-.101.26-.222.445-.416.64-.195.194-.38.315-.64.416-.196.076-.49.166-1.032.19-.586.028-.762.033-2.247.033-1.485 0-1.66-.005-2.247-.032-.542-.025-.836-.115-1.032-.191-.26-.101-.445-.222-.64-.416a1.722 1.722 0 0 1-.416-.64c-.076-.196-.166-.49-.191-1.032-.027-.587-.032-.762-.032-2.247 0-1.485.005-1.66.032-2.247.025-.542.115-.836.191-1.032.101-.26.222-.445.416-.64.195-.194.38-.315.64-.416.196-.076.49-.166 1.032-.19.587-.028.762-.033 2.247-.033zm0 1.703a2.855 2.855 0 1 0 0 5.71 2.855 2.855 0 0 0 0-5.71zm0 4.708a1.853 1.853 0 1 1 0-3.706 1.853 1.853 0 0 1 0 3.706zm3.635-4.821a.667.667 0 1 1-1.334 0 .667.667 0 0 1 1.334 0z" />
        </g>
      </svg>
    </a>
  )
}

const Twitter = () => {
  return (
    <a href="https://twitter.com/chungguo_me/" target="_blank" className="transform hover:scale-125">
      <svg width="20" height="20" fill="currentColor">
        <path fill="none" d="M-1-1h22v22H-1z" />
        <g>
          <path stroke="null" d="M10 1.225a8.775 8.775 0 1 0 .001 17.551 8.775 8.775 0 0 0 0-17.55zm4.42 7.006c.005.095.007.19.007.286 0 2.923-2.224 6.292-6.292 6.292a6.262 6.262 0 0 1-3.39-.993A4.437 4.437 0 0 0 8.02 12.9a2.214 2.214 0 0 1-2.065-1.536 2.198 2.198 0 0 0 .998-.038 2.213 2.213 0 0 1-1.774-2.168v-.029c.298.166.64.266 1.002.277a2.21 2.21 0 0 1-.685-2.952 6.278 6.278 0 0 0 4.559 2.31 2.213 2.213 0 0 1 3.768-2.017 4.417 4.417 0 0 0 1.404-.537c-.166.517-.516.95-.973 1.224a4.421 4.421 0 0 0 1.27-.349 4.468 4.468 0 0 1-1.103 1.146z" />
        </g>
      </svg>
    </a>
  )
}

const Github = () => {
  return (
    <a href="https://github.com/chungguo/chungguo.github.io" target="_blank" className="transform hover:scale-125">
      <svg width="20" height="20" fill="currentColor">
        <path fill="none" d="M-1-1h22v22H-1z" /><g>
          <path stroke="null" d="M10 1.189a9.034 9.034 0 0 0-2.856 17.606c.452.082.617-.197.617-.435 0-.215-.008-.927-.013-1.682-2.512.546-3.043-1.065-3.043-1.065-.411-1.043-1.003-1.321-1.003-1.321-.821-.56.062-.55.062-.55.907.064 1.385.932 1.385.932.806 1.38 2.115.981 2.629.75.082-.583.316-.982.573-1.207-2.005-.228-4.115-1.004-4.115-4.465 0-.987.353-1.792.93-2.425-.093-.229-.404-1.148.089-2.391 0 0 .757-.243 2.484.926A8.6 8.6 0 0 1 10 5.558c.768.003 1.54.104 2.262.305 1.723-1.17 2.482-.926 2.482-.926.494 1.244.183 2.162.09 2.39.58.633.93 1.438.93 2.425 0 3.47-2.114 4.234-4.126 4.458.325.28.613.83.613 1.672 0 1.208-.012 2.181-.012 2.48 0 .24.164.52.622.433A9.034 9.034 0 0 0 10 1.189z" />
        </g>
      </svg>
    </a>
  )
}

export default function Social(props: Props) {
  const { styleNames = '', exclude = [] } = props;

  const Icons = {
    'blog': <Blog key="blog" />,
    'twitter': <Twitter key="twitter" />,
    'instagram': <Instagram key="instagram" />,
    'github': <Github key="github"/>,
  };

  return (
    <section className={`flex items-center mx-8 space-x-4 ${styleNames}`}>
      {
        Object.keys(Icons).filter(name => !exclude.includes(name)).map(v => {
          return Icons[v];
        })
      }
    </section>
  )
}
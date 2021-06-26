import classNames from 'classnames';
import Header from 'chungguo/components/Header';
import Link from 'chungguo/components/Link';
import Social from 'chungguo/components/Social';
import Tencent from 'chungguo/public/assets/common/tencent-logo.svg';
import Alibaba from 'chungguo/public/assets/common/alibaba-logo.svg';
import Meituan from 'chungguo/public/assets/common/meituan-logo.svg';

const experience = [{
  time: '2019.10 至今',
  location: 'Chengdu 成都',
  company: 'Meituan(美团)',
  logo: <Meituan />
}, {
  time: '2016.07 - 2019.10',
  location: 'Shenzhen 深圳',
  company: 'Tencent(腾讯)',
  logo: <Tencent />
}, {
  time: '2015.07 - 2015.09',
  location: 'Hangzhou 杭州',
  company: 'Alibaba(淘宝)',
  logo: <Alibaba />
}];

export default function About() {
  return (
    <article className="min-h-screen">
      <Header />
      <main className="sm:max-w-2xl mx-auto px-5 pt-10 sm:px-6">
        <section className="mb-4">
          <h1 className="font-semibold text-lg">Experience<br />工作履历</h1>
          <ul className="ml-5">
            {
              experience.map((item, idx) => (
                <li className="relative pl-8 pt-4 pb-4" key={item.time}>
                  <span className={classNames("absolute z-1 border-l border-gray-300 top-0 left-0 bottom-0", {
                    'top-1/2': idx === 0,
                    'bottom-1/2': idx === experience.length - 1
                  })}></span>
                  <span className="absolute z-2 bg-white border border-gray-300 flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 p-1 rounded-full left-0 top-1/2">
                    {item.logo}
                  </span>
                  <section>
                    <p className="text-gray-500 text-sm">{item.time}</p>
                    <p className="text-sm">{item.location}</p>
                    <p>{item.company}</p>
                  </section>
                </li>
              ))
            }
          </ul>
        </section>
        <section className="mb-4">
          <h1 className="font-semibold text-lg mb-4">Contact<br />社交账号</h1>
          <Social />
        </section>
        <section>
          <h1 className="font-semibold text-lg mb-4">Acknowledgements<br />致谢</h1>
          <p>感谢<Link href="https://www.opendoodles.com/"><a>opendoodles</a></Link>提供本站所有插画</p>
        </section>
      </main>
    </article>
  )
}
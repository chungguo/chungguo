import classNames from 'classnames';
import Link from 'chungguo/components/fundamental/Link';
import Social from 'chungguo/components/Social';
import Tencent from 'chungguo/public/assets/common/tencent-logo.svg';
import Alibaba from 'chungguo/public/assets/common/alibaba-logo.svg';
import Meituan from 'chungguo/public/assets/common/meituan-logo.svg';
import Happy from 'chungguo/public/assets/common/blushy-happy.svg';

const experience = [{
  time: '2021.09 至今',
  location: 'Chengdu 成都',
  company: 'Tencent 腾讯',
  logo: <Tencent />
}, {
  time: '2019.10 - 2021.09',
  location: 'Chengdu 成都',
  company: 'Meituan 美团',
  logo: <Meituan />
}, {
  time: '2016.07 - 2019.10',
  location: 'Shenzhen 深圳',
  company: 'Tencent 腾讯',
  logo: <Tencent />
}, {
  time: '2015.07 - 2015.09',
  location: 'Hangzhou 杭州',
  company: 'Alibaba 淘宝（实习）',
  logo: <Alibaba />
}];

function AboutPage() {
  return (
    <article className="min-h-screen">
      <main className="sm:max-w-2xl mx-auto px-5 pt-10 sm:px-6">
        <section className="w-20 mb-4 m-auto dark:text-gray-300">
          <Happy />
        </section>
        <section className="mb-4 flex flex-col items-center dark:text-gray-300">
          <h1 className="font-semibold text-lg text-center">Experience<br />工作履历</h1>
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
                    <p className="text-gray-500 dark:text-gray-400 text-sm">{item.time}</p>
                    <p className="text-sm">{item.location}</p>
                    <p>{item.company}</p>
                  </section>
                </li>
              ))
            }
          </ul>
        </section>
        <section className="mb-10 flex flex-col items-center dark:text-gray-300">
          <h1 className="font-semibold text-lg mb-4">Contact<br />社交账号</h1>
          <Social />
        </section>
        <section className="text-center dark:text-gray-300">
          <h1 className="font-semibold text-lg mb-4">Acknowledgements<br />致谢</h1>
          <p>本站所有插画均来自<Link href="https://www.opendoodles.com/"><a>opendoodles</a></Link></p>
          <p>本站所有配图均来自<Link href="https://unsplash.com/"><a>unsplash</a></Link></p>
        </section>
      </main>
    </article>
  )
}

export default function About() {
  return <AboutPage />;
}

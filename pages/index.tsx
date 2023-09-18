import Hero from 'chungguo/public/assets/common/hero.svg';
import { SELF_BREIF } from 'chungguo/shared/constants';

export default function Index() {
  return (
    <main className="flex flex-grow flex-col justify-center">
      <section className="max-w-6xl md:max-w-3xl lg:max-w-5xl mx-auto px-8 sm:px-6 dark:text-white">
        <div className="flex items-center justify-between flex-row">
          <h1 className="text-4xl l lg:text-5xl sm:text-3x font-extrabold font-custom leading-tighter tracking-tight mb-4 sm:whitespace-nowrap">
            <p className="text-3xl l lg:text-4xl sm:text-3xl mb-6">Hi there 🖖 .</p>
            <p>I&apos;m <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">Chung Guo</span></p>
            <p className="block">A coder, amateur photographer.</p>
          </h1>
          <section className="hero-illustration w-0 md:w-40 lg:w-72">
            <Hero />
          </section>
        </div>
        <p className="text-base text-gray-500 sm:pr-10 md:pr-20">{SELF_BREIF}</p>
      </section>
    </main>
  );
}

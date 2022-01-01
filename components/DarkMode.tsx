
import { useState, useCallback, useEffect } from 'react';
import Sun from 'chungguo/public/assets/common/sun.svg';
import Moon from 'chungguo/public/assets/common/moon.svg';

export default function DarkMode() {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  const changeMode = useCallback(() => {
    setDarkMode(darkMode => {
      localStorage.__chungguo_theme__ = darkMode ? 'light' : 'dark';
      return !darkMode;
    });
  }, []);

  const Icon = useCallback(() => {
    if (darkMode === null) {
      return null;
    }

    return darkMode ? <Moon /> : <Sun />;
  }, [
    darkMode,
  ]);

  useEffect(() => {
    if (
      localStorage.__chungguo_theme__ === 'dark' ||
      (!('__chungguo_theme__' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setDarkMode(false);
    }
  });

  return (
    <span className="inline-block w-5 h-5 cursor-pointer" onClick={changeMode}>
      <Icon />
    </span>
  );
}

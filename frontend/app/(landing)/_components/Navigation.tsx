'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-10 transition-all duration-300 ${
        isScrolled ? 'bg-white bg-opacity-70 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}>
      <aside className="flex items-center gap-2">
        <span className="text-xl font-bold">CultureMatch</span>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
          <li>
            <Link href={'#'}>About</Link>
          </li>
          <li>
            <Link href={'#'}>Team</Link>
          </li>
          <li>
            <Link href={'#'}>Login</Link>
          </li>
        </ul>
      </nav>
      <nav className="md:hidden">
        <Link href={'#'}>Login</Link>
      </nav>
    </div>
  );
};

export default Navigation;

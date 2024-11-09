'use client';
import Link from 'next/link';
import { useState, useEffect, MouseEvent } from 'react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Custom scroll function to control scroll speed
  const smoothScrollTo = (targetPosition: number, speed: number = 0.1) => {
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, speed * 1000);
      window.scrollTo(0, run);

      if (timeElapsed < speed * 1000) {
        requestAnimationFrame(animation);
      }
    };

    const ease = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  };

  const handleSmoothScroll = (
    e: MouseEvent<HTMLAnchorElement>,
    targetId: string,
    speed: number = 0.5,
  ) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const targetPosition = targetElement.offsetTop;
      smoothScrollTo(targetPosition, speed);
    }
  };

  const handleScrollToTop = (speed: number = 0.5) => {
    smoothScrollTo(0, speed);
  };

  return (
    <div
      className={`fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-10 transition-all duration-300 ${
        isScrolled ? 'bg-white bg-opacity-70 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}>
      <button
        className="flex items-center gap-2 cursor-pointer bg-transparent border-none p-0"
        onClick={() => handleScrollToTop(0.5)}>
        <span className="text-xl font-bold">CultureMatch</span>
      </button>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
          <li>
            <a href="#about-section" onClick={(e) => handleSmoothScroll(e, 'about-section', 0.5)}>
              About
            </a>
          </li>
          <li>
            <a href="#team-section" onClick={(e) => handleSmoothScroll(e, 'team-section', 0.5)}>
              Team
            </a>
          </li>
          <li>
            <Link href={'/onboarding'}>Try Now!</Link>
          </li>
        </ul>
      </nav>
      <nav className="md:hidden">
        <Link href={'/onboarding'}>Try Now!</Link>
      </nav>
    </div>
  );
};

export default Navigation;

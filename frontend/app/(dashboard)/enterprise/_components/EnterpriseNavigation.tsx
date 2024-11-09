'use client';
import UserButton from '@/components/UserButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type RouteLink = {
  href: string;
  text: string;
};

const routes: RouteLink[] = [
  { href: '/enterprise/metrics', text: 'Metrics' },
  { href: '/enterprise/positions', text: 'Positions' },
  { href: '/enterprise/profile', text: 'Profile' },
];

const EnterpriseNavigation = () => {
  const currentPath = usePathname();

  return (
    <div
      className={`fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-10 transition-all duration-300 bg-white bg-opacity-70 backdrop-blur-md shadow-md`}>
      <aside className="flex items-center gap-2 cursor-pointer w-screen max-w-[1280px] m-auto">
        <Link href="/" className="text-xl font-bold">
          CultureMatch
        </Link>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="items-center justify-center grid grid-cols-3 text-center relative mb-1">
          {routes.map((route) => (
            <li key={route.href} className="px-4">
              <Link href={route.href} className="text-lg">
                {route.text}
              </Link>
            </li>
          ))}
        </ul>

        <div
          className="absolute bottom-0 left-0 h-1rounded-md transition-transform duration-500 ease-in-out px-5 w-full"
          style={{
            width: `calc(100% / ${routes.length})`,
            transform: `translateX(${routes.findIndex((route) => route.href === currentPath) * 100}%)`,
          }}>
          <div className="relative flex items-center">
            <div className="bg-primary/30 h-1 mx-auto w-6"></div>
          </div>
        </div>
      </nav>
      <nav className="md:hidden">
        <UserButton />
      </nav>
    </div>
  );
};

export default EnterpriseNavigation;

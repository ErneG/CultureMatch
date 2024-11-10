import { Search, Newspaper, BellIcon, LogOut } from 'lucide-react';
import Link from 'next/link';

export const EmailHeader = () => {
  return (
    <div className="flex flex-row items-center justify-between border-b border-border px-3 py-1">
      <Link
        href="/onboarding"
        aria-label="Close"
        className="flex md:hidden items-center justify-center rounded-full w-5 h-5 hover:bg-accent hover:text-accent-foreground">
        <LogOut className="w-4 h-4 rotate-180" />
      </Link>
      <div className="hidden sm:flex space-x-2 items-center justify-center opacity-0 md:opacity-100 ">
        <Link
          href="/onboarding"
          aria-label="Close"
          className="w-3 h-3 bg-red-500 rounded-full"></Link>
        <button aria-label="Minimize" className="w-3 h-3 bg-yellow-500 rounded-full"></button>
        <button aria-label="Expand" className="w-3 h-3 bg-green-500 rounded-full"></button>
      </div>
      <div className="max-w-[300px] w-full h-7 border border-border rounded-lg flex items-center pl-1 mx-2 sm:mx-0">
        <Search className="w-5 h-5 text-border" />
      </div>

      <div className="flex space-x-2 items-center justify-center">
        <button className="flex items-center justify-center rounded-full w-5 h-5 hover:bg-accent hover:text-accent-foreground">
          <Newspaper className="w-4 h-4" />
        </button>
        <button className="flex items-center justify-center rounded-full w-5 h-5 hover:bg-accent hover:text-accent-foreground">
          <BellIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

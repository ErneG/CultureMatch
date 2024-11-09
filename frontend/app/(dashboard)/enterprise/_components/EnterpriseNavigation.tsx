'use client';
import UserButton from '@/components/UserButton';
import Link from 'next/link';

const EnterpriseNavigation = () => {
  return (
    <div
      className={`fixed top-0 right-0 left-0 p-4 flex items-center justify-between z-10 transition-all duration-300 bg-white bg-opacity-70 backdrop-blur-md shadow-md`}>
      <aside className="flex items-center gap-2 cursor-pointer">
        <Link href="/" className="text-xl font-bold">
          CultureMatch
        </Link>
      </aside>
      <nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <ul className="flex items-center justify-center gap-8">
          <li>
            <Link href="/enterprise/summary">Summary</Link>
          </li>
          <li>
            <Link href="/enterprise/applicants">Applicants</Link>
          </li>
          <li>
            <Link href={'/enterprise/positions'}>Positions</Link>
          </li>
          <li>
            <Link href={'/enterprise/profile'}>Profile</Link>
          </li>
        </ul>
      </nav>
      <nav className="md:hidden">
        <UserButton />
      </nav>
    </div>
  );
};

export default EnterpriseNavigation;

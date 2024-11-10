import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MenuIcon } from 'lucide-react';

const links = [
  { href: '/enterprise/metrics', label: 'Metrics' },
  { href: '/enterprise/positions', label: 'Positions' },
  { href: '/enterprise/profile', label: 'Profile' },
];
const UserButton = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleItemClick = () => {
    setDropdownOpen(false);
  };
  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild className="focus-visible:ring-transparent">
        <Button variant="ghost" className="flex items-center justify-center">
          <MenuIcon style={{ width: '30px', height: '30px' }} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-accent" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">Test user</p>
            <p className="text-xs leading-none text-muted-foreground">test@gmail.com</p>
          </div>
        </DropdownMenuLabel>
        <div className="md:hidden">
          <DropdownMenuSeparator />
          {links.map((link) => (
            <DropdownMenuItem key={link.href} onClick={handleItemClick}>
              <Link href={link.href} className="w-full">
                {link.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleItemClick}>
          <Link href="/" className="w-full">
            Back to home page
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            console.log('Log out');
            handleItemClick();
          }}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;

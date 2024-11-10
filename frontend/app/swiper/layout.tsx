'use client';

import { AcceptedJobsProvider } from '@/components/providers/AcceptedJobsContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React, { ReactNode } from 'react';

const SwiperLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AcceptedJobsProvider>
      <nav className="mb-8 absolute top-2 left-2">
        <Button
          variant="link"
          asChild
          className="gap-2"
          onClick={() => window.localStorage.clear()}>
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </nav>
      {children}
    </AcceptedJobsProvider>
  );
};

export default SwiperLayout;

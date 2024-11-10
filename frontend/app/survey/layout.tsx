import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React, { ReactNode } from 'react';

const SurveyLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <nav className="mb-8 absolute top-2 left-2">
        <Button variant="link" asChild className="gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </nav>
      {children}
    </div>
  );
};

export default SurveyLayout;

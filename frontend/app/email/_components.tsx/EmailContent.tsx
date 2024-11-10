'use client';
import { Button } from '@/components/ui/button';

import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from 'next/navigation';

const EmailContent = () => {
  const router = useRouter();
  return (
    <ScrollArea className="flex-1 p-4 sm:p-6">
      <div className="mx-auto max-w-full md:max-w-2xl lg:max-w-3xl">
        <h1 className="mb-1 text-lg sm:text-xl md:text-2xl">
          Share Your Thoughts in Our Anonymous Employee Survey
        </h1>
        <p className="mb-2 text-xs text-gray-600 sm:text-sm">
          From: <em>no-reply@example.com</em>
        </p>
        <p className="mb-6 text-xs text-gray-600 sm:text-sm">
          To: <em>john.doe@example.com</em>
        </p>
        <div className="prose mb-6 max-w-none text-sm sm:text-base">
          <p>Dear John,</p>
          <p>
            We value your well-being and want to make our workplace better for everyone. Please take
            a few minutes to complete our anonymous survey about work culture and your well-being.
            Your honest feedback will help us improve and create a more supportive environment.
          </p>
          <p>
            Best regards,
            <br />
            The Development Team
          </p>
        </div>
        <div className="flex justify-center">
          <Button
            onClick={() => {
              router.push('/survey/employee');
            }}>
            Take Survey
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};

export default EmailContent;

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EndCardProps {
  onRestart: () => void;
  onNextPage: () => void;
}

export const EndCard: React.FC<EndCardProps> = ({ onRestart, onNextPage }) => {
  return (
    <Card className="w-full h-full p-8 flex flex-col items-center justify-center text-center">
      <h2 className="text-3xl font-bold mb-4">You&apos;ve reached the end!</h2>
      <p className="text-lg mb-8">Would you like to restart or proceed to the next page?</p>
      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button onClick={onRestart} className="w-full">
          Restart
        </Button>
        <Button variant="outline" onClick={onNextPage} className="w-full">
          Next Page
        </Button>
      </div>
    </Card>
  );
};

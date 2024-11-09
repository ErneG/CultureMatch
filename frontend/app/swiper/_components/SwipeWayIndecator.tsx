import React from 'react';
import { X, Check } from 'lucide-react';

interface SwipeWayIndicatorProps {
  swipeDir: number;
}

export const SwipeWayIndicator: React.FC<SwipeWayIndicatorProps> = ({ swipeDir }) => {
  if (swipeDir === 0) return null;

  return (
    <div className="flex justify-center items-center mt-5">
      {swipeDir > 0 ? (
        <div className="flex items-center gap-2 text-green-500">
          <Check className="h-6 w-6" />
          <span className="text-lg font-semibold">Accept</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 text-red-500">
          <X className="h-6 w-6" />
          <span className="text-lg font-semibold">Decline</span>
        </div>
      )}
    </div>
  );
};

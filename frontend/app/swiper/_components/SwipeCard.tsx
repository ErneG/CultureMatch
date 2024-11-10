import React from 'react';
import { animated, to as interpolate, SpringValue } from '@react-spring/web';
import { CardFront } from './CardFront';
import { CardBack } from './CardBack';
import { Job } from '@/types/job';

interface SwipeCardProps {
  job: Job;
  index: number;
  style: {
    x: SpringValue<number>;
    rot: SpringValue<number>;
    scale: SpringValue<number>;
  };
  bind: ReturnType<typeof import('@use-gesture/react').useDrag>;
  handleCardClick: (index: number) => void;
  isFlipped: boolean;
  swipeDir: number;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
  job,
  index,
  style,
  bind,
  handleCardClick,
  isFlipped,
  swipeDir,
}) => {
  return (
    <animated.div
      key={index}
      className="absolute inset-0 will-change-transform origin-bottom"
      style={{
        x: style.x,
        transform: interpolate([style.rot], (r) => `rotate(${r}deg)`),
        zIndex: index,
      }}>
      <div
        {...bind(index)}
        onClick={() => handleCardClick(index)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleCardClick(index);
          }
        }}
        className="absolute inset-0 cursor-pointer">
        {/* Card Content */}{' '}
        {!isFlipped ? (
          <CardFront job={job} swipeDir={swipeDir} />
        ) : (
          <CardBack job={job} swipeDir={swipeDir} />
        )}
      </div>
    </animated.div>
  );
};

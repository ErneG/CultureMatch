'use client';

import React, { useState, useEffect } from 'react';
import { useSprings } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import Confetti from 'react-confetti';
import { useRouter } from 'next/navigation'; // For navigation

import { X, Check } from 'lucide-react';
import { SwipeCard } from './_components/SwipeCard';
import { Job } from '@/types/job';
import { EndCard } from './_components/EndCard';
import { SwipeWayIndicator } from './_components/SwipeWayIndecator';
import { useAcceptedJobs } from '@/components/providers/AcceptedJobsContext';

// Mock data for job listings
const jobs: Job[] = [
  {
    id: 1,
    company: 'TechCorp',
    position: 'Frontend Developer',
    culture: { workLifeBalance: 4.5, careerGrowth: 4.2, innovation: 4.8 },
    details:
      'TechCorp is a leading software company specializing in AI-driven solutions. We offer competitive salaries and a dynamic work environment.',
    location: 'San Francisco, CA',
    salary: '$100,000 - $150,000',
  },
  {
    id: 2,
    company: 'HealthTech',
    position: 'UX Designer',
    culture: { workLifeBalance: 4.2, careerGrowth: 4.0, innovation: 4.3 },
    details:
      'HealthTech is revolutionizing the healthcare industry with cutting-edge technology. Join us in creating intuitive designs for life-saving applications.',
    location: 'Boston, MA',
    salary: '$90,000 - $130,000',
  },
  {
    id: 3,
    company: 'EcoSolutions',
    position: 'Data Scientist',
    culture: { workLifeBalance: 4.7, careerGrowth: 4.5, innovation: 4.6 },
    details:
      'EcoSolutions is committed to fighting climate change through data-driven approaches. We offer flexible work hours and a mission-driven environment.',
    location: 'Seattle, WA',
    salary: '$120,000 - $180,000',
  },
];

const to = (i: number) => ({
  x: 0,
  rot: 0,
  scale: 1,
  opacity: 1,
  delay: i * 100,
});

export const Swiper: React.FC = () => {
  const [gone] = useState(() => new Set<number>());
  const [cardPages, setCardPages] = useState<Record<number, number>>({});
  const [swipeDir, setSwipeDir] = useState<Record<number, number>>({});
  const [springs, api] = useSprings(jobs.length, (i) => ({ ...to(i), from: to(i) }));
  const [isDragging, setIsDragging] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  // New state variables for end card and confetti fade-out
  const [showEndCard, setShowEndCard] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false); // for fade-out effect
  const { addAcceptedJob, clearAcceptedJobs } = useAcceptedJobs();
  const router = useRouter(); // For navigation

  // Handle window resize and initial size

  useEffect(() => {
    clearAcceptedJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const onSwipeRight = (jobId: number) => {
    const acceptedJob = jobs.find((job) => job.id === jobId);
    if (acceptedJob) {
      addAcceptedJob(acceptedJob);
    }
  };

  const onSwipeLeft = (jobId: number) => {
    console.log('Swiped left on job:', jobId);
  };

  // Handle card flip on click
  const handleCardClick = (index: number) => {
    if (isDragging) return;

    setCardPages((prev) => ({
      ...prev,
      [index]: prev[index] === 1 ? 0 : 1,
    }));
  };

  const VELOCITY_THRESHOLD = 0.2;
  const DISTANCE_THRESHOLD = 0.25;

  // Handle swipe for accept/decline
  const bind = useDrag(
    ({ args: [index], active, movement: [mx], velocity: [vx], distance }) => {
      const distanceMagnitude = distance;
      setIsDragging(distanceMagnitude[0] > 5);

      const dir = mx > 0 ? 1 : -1;
      setSwipeDir((prev) => ({ ...prev, [index]: active ? dir : 0 }));

      const isSwipedFastEnough = Math.abs(vx) > VELOCITY_THRESHOLD;
      const isSwipedFarEnough = Math.abs(mx) > windowWidth * DISTANCE_THRESHOLD;
      const shouldDismissCard = !active && (isSwipedFastEnough || isSwipedFarEnough);

      api.start((i) => {
        if (index !== i) return;

        if (shouldDismissCard) {
          gone.add(index);

          if (dir > 0) {
            onSwipeRight(jobs[index].id);
          } else {
            onSwipeLeft(jobs[index].id);
          }

          const THROW_DISTANCE = windowWidth + 200;
          const THROW_MULTIPLIER = 20;

          return {
            x: THROW_DISTANCE * dir,
            rot: mx / 100 + dir * THROW_MULTIPLIER * vx,
            scale: 0.5,
            config: { friction: 50, tension: 200 },
          };
        }

        return {
          x: active ? mx : 0,
          rot: active ? mx / 100 : 0,
          scale: 1,
          config: { friction: 50, tension: active ? 800 : 500 },
        };
      });

      if (!active && gone.size === jobs.length) {
        setShowConfetti(true); // Show confetti
        setTimeout(() => {
          setShowEndCard(true);
        }, 300); // Show end card after 500ms
        setSwipeDir({});

        // Start fade-out after 5 seconds
        setTimeout(() => {
          setIsFadingOut(true); // Trigger fade-out effect
        }, 5000);

        // Hide confetti completely after fade-out transition
        setTimeout(() => {
          setShowConfetti(false);
          setIsFadingOut(false);
        }, 5500); // 500ms for the fade-out duration
      }
    },
    {
      filterTaps: true,
      bounds: windowWidth ? { left: -windowWidth, right: windowWidth } : undefined,
      rubberband: true,
    },
  );

  // Handler to restart the swiper
  const handleRestart = () => {
    gone.clear();
    setShowEndCard(false);
    setShowConfetti(false);
    setIsFadingOut(false);
    setSwipeDir({});
    setCardPages({});
    clearAcceptedJobs();
    api.start((i) => to(i));
  };

  // Handler to proceed to the next page
  const handleNextPage = () => {
    router.push('/swiper/results');
  };

  // Don't render until we have window width
  if (!windowWidth) return null;

  return (
    <div className="flex items-start justify-center w-screen h-[100vh] bg-[#f5f5f5] overflow-hidden gap-4">
      {/* Confetti Effect */}
      {showConfetti && (
        <Confetti
          width={windowWidth}
          height={window.innerHeight}
          opacity={isFadingOut ? 0 : 1} // Use `opacity` to control fade-out
          className="transition-opacity duration-500" // CSS transition for fade-out
        />
      )}

      <div className="relative w-full h-[calc(100%-3rem)] max-w-md max-h-screen px-4 py-6">
        <div className="relative w-full h-full">
          {showEndCard ? (
            <EndCard onRestart={handleRestart} onNextPage={handleNextPage} />
          ) : (
            springs.map((style, i) => (
              <React.Fragment key={i}>
                <SwipeCard
                  job={jobs[i]}
                  index={i}
                  style={style}
                  bind={bind}
                  handleCardClick={handleCardClick}
                  isFlipped={cardPages[i] === 1}
                  swipeDir={swipeDir[i] || 0}
                />
                {i === jobs.length - 1 && <SwipeWayIndicator swipeDir={swipeDir[i] || 0} />}
              </React.Fragment>
            ))
          )}
        </div>
      </div>

      {/* Conditionally render bottom indicator */}
      {!showEndCard && (
        <div className="absolute bottom-3 left-0 right-0 text-center">
          <div className="bg-background/80 backdrop-blur-sm mx-auto px-6 py-3 rounded-full inline-flex gap-6">
            <p className="text-muted-foreground flex items-center gap-2">
              <X className="h-4 w-4" /> Swipe left to decline
            </p>
            <p className="text-muted-foreground flex items-center gap-2">
              <Check className="h-4 w-4" /> Swipe right to accept
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Swiper;

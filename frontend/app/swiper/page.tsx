'use client';

import React, { useState, useEffect } from 'react';
import { useSprings, animated, to as interpolate } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Building2, MapPin, DollarSign, Briefcase, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for job listings
const jobs = [
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

const Swiper = () => {
  const [gone] = useState(() => new Set());
  const [cardPages, setCardPages] = useState<Record<number, number>>({});
  const [swipeDir, setSwipeDir] = useState<Record<number, number>>({});
  const [props, api] = useSprings(jobs.length, (i) => ({ ...to(i), from: to(i) }));
  const [isDragging, setIsDragging] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  // Handle window resize and initial size
  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth(); // Set initial width
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const onSwipeRight = (jobId: number) => {
    console.log('Swiped right on job:', jobId);
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

  // Handle swipe for accept/decline
  const bind = useDrag(
    ({ args: [index], active, movement: [mx], velocity: [vx], distance }) => {
      setIsDragging(distance[0] > 5);

      const dir = mx > 0 ? 1 : mx < 0 ? -1 : 0;
      setSwipeDir((prev) => ({ ...prev, [index]: active ? dir : 0 }));

      const VELOCITY_THRESHOLD = 0.4;
      const DISTANCE_THRESHOLD = 1;

      const isSwipedFastEnough = Math.abs(vx) > VELOCITY_THRESHOLD;
      const isSwipedFarEnough = Math.abs(mx) > windowWidth * DISTANCE_THRESHOLD;
      const shouldDismissCard = !active && (isSwipedFastEnough || isSwipedFarEnough);

      api.start((i) => {
        if (index !== i) return;

        if (shouldDismissCard) {
          gone.add(index);

          if (mx > 0) {
            onSwipeRight(jobs[index].id);
          } else {
            onSwipeLeft(jobs[index].id);
          }

          const THROW_DISTANCE = windowWidth + 200;
          const THROW_MULTIPLIER = 10;

          return {
            x: THROW_DISTANCE * (mx > 0 ? 1 : -1),
            rot: mx / 100 + (mx > 0 ? 1 : -1) * THROW_MULTIPLIER * vx,
            scale: 0.5,
            config: { friction: 50, tension: 200 },
          };
        }

        return {
          x: active ? mx : 0,
          rot: active ? mx / 100 : 0,
          scale: 1,
          config: {
            friction: 50,
            tension: active ? 800 : 500,
          },
        };
      });

      if (!active && gone.size === jobs.length) {
        setTimeout(() => {
          gone.clear();
          setSwipeDir({});
          api.start((i) => to(i));
        }, 600);
      }
    },
    {
      filterTaps: true,
      bounds: windowWidth ? { left: -windowWidth, right: windowWidth } : undefined,
      rubberband: true,
    },
  );

  // Don't render until we have window width
  if (!windowWidth) return null;

  return (
    <div>
      <div className="flex items-center justify-center w-screen h-screen bg-[#f5f5f5] overflow-hidden">
        <div className="relative w-full h-full max-w-[100vw] max-h-[100vh] px-8 py-12">
          <div className="relative w-full h-full">
            {props.map(({ x, rot }, i) => (
              <animated.div
                className="absolute inset-0 will-change-transform origin-bottom"
                key={i}
                style={{
                  x,
                  transform: interpolate([rot], (r) => `rotate(${r}deg)`),
                  zIndex: jobs.length - i,
                }}>
                <div
                  {...bind(i)}
                  onClick={() => handleCardClick(i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCardClick(i);
                    }
                  }}
                  className="absolute inset-0 cursor-pointer">
                  {/* Swipe Indicators */}
                  <div className="absolute inset-0 flex justify-between items-center px-8 pointer-events-none">
                    <animated.div
                      style={{
                        opacity: interpolate([x], (x) => Math.min(1, Math.max(0, -x / 100))),
                      }}>
                      <div className="bg-red-500/80 text-white px-6 py-2 rounded-full backdrop-blur-sm">
                        Decline
                      </div>
                    </animated.div>
                    <animated.div
                      style={{
                        opacity: interpolate([x], (x) => Math.min(1, Math.max(0, x / 100))),
                      }}>
                      <div className="bg-green-500/80 text-white px-6 py-2 rounded-full backdrop-blur-sm">
                        Accept
                      </div>
                    </animated.div>
                  </div>
                  {/* Card Content - Front */}
                  <animated.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: cardPages[i] === 1 ? 0 : 1,
                      pointerEvents: cardPages[i] === 1 ? 'none' : 'auto',
                      transition: 'opacity 0.3s ease-in-out',
                    }}>
                    <Card
                      className={cn(
                        'w-full h-full p-8 flex flex-col transition-colors',
                        swipeDir[i] > 0 && 'border-green-500/50',
                        swipeDir[i] < 0 && 'border-red-500/50',
                      )}>
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h2 className="text-3xl font-bold tracking-tight mb-2">
                            {jobs[i].company}
                          </h2>
                          <h3 className="text-xl text-muted-foreground">{jobs[i].position}</h3>
                        </div>
                        <Building2 className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <Separator className="my-6" />
                      <div className="flex flex-wrap gap-2 mb-6">
                        <Badge variant="secondary" className="flex gap-1 items-center">
                          <MapPin className="h-3 w-3" /> {jobs[i].location}
                        </Badge>
                        <Badge variant="secondary" className="flex gap-1 items-center">
                          <DollarSign className="h-3 w-3" /> {jobs[i].salary}
                        </Badge>
                      </div>
                      <div className="space-y-6 flex-grow">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Work-Life Balance</span>
                            <span className="font-medium">{jobs[i].culture.workLifeBalance}/5</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${(jobs[i].culture.workLifeBalance / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Career Growth</span>
                            <span className="font-medium">{jobs[i].culture.careerGrowth}/5</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${(jobs[i].culture.careerGrowth / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Innovation</span>
                            <span className="font-medium">{jobs[i].culture.innovation}/5</span>
                          </div>
                          <div className="h-2 bg-secondary rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${(jobs[i].culture.innovation / 5) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground text-center mt-6">
                        Tap to see more details
                      </p>
                    </Card>
                  </animated.div>
                  {/* Card Content - Back */}
                  <animated.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: cardPages[i] === 1 ? 1 : 0,
                      pointerEvents: cardPages[i] === 1 ? 'auto' : 'none',
                      transition: 'opacity 0.3s ease-in-out',
                    }}>
                    <Card
                      className={cn(
                        'w-full h-full p-8 flex flex-col transition-colors',
                        swipeDir[i] > 0 && 'border-green-500/50',
                        swipeDir[i] < 0 && 'border-red-500/50',
                      )}>
                      <div className="flex items-start justify-between mb-6">
                        <div>
                          <h2 className="text-3xl font-bold tracking-tight mb-2">
                            {jobs[i].company}
                          </h2>
                          <h3 className="text-xl text-muted-foreground">{jobs[i].position}</h3>
                        </div>
                        <Briefcase className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <Separator className="my-6" />
                      <p className="text-lg flex-grow leading-relaxed">{jobs[i].details}</p>
                      <div className="space-y-4 mt-6">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{jobs[i].location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-muted-foreground" />
                          <span className="font-medium">{jobs[i].salary}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground text-center mt-6">
                        Tap to return
                      </p>
                    </Card>
                  </animated.div>
                </div>
              </animated.div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <div className="bg-background/80 backdrop-blur-sm mx-auto px-6 py-3 rounded-full inline-flex gap-6">
            <p className="text-muted-foreground flex items-center gap-2">
              <X className="h-4 w-4" /> Swipe left to decline
            </p>
            <p className="text-muted-foreground flex items-center gap-2">
              <Check className="h-4 w-4" /> Swipe right to accept
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swiper;

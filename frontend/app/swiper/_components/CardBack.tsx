// CardBack.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Briefcase, MapPin, DollarSign } from 'lucide-react';
import { Job } from '@/types/job';
import { cn } from '@/lib/utils';

interface CardBackProps {
  job: Job;
  swipeDir: number;
}

export const CardBack: React.FC<CardBackProps> = ({ job, swipeDir }) => (
  <Card
    className={cn(
      'w-full h-full p-8 flex flex-col transition-colors',
      swipeDir > 0 && 'border-green-500/50',
      swipeDir < 0 && 'border-red-500/50',
    )}>
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-2">{job.company}</h2>
        <h3 className="text-xl text-muted-foreground">{job.position}</h3>
      </div>
      <Briefcase className="h-8 w-8 text-muted-foreground" />
    </div>
    <Separator className="my-6" />
    <p className="text-lg flex-grow leading-relaxed">{job.details}</p>
    <div className="space-y-4 mt-6">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-muted-foreground" />
        <span className="font-medium">{job.location}</span>
      </div>
      <div className="flex items-center gap-2">
        <DollarSign className="h-5 w-5 text-muted-foreground" />
        <span className="font-medium">{job.salary}</span>
      </div>
    </div>
    <p className="text-sm text-muted-foreground text-center mt-6">Tap to return</p>
  </Card>
);

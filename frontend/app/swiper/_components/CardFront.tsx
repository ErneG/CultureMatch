// CardFront.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Building2, MapPin, DollarSign } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Job } from '@/types/job';

interface CardFrontProps {
  job: Job;
  swipeDir: number;
}

export const CardFront: React.FC<CardFrontProps> = ({ job, swipeDir }) => (
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
      <Building2 className="h-8 w-8 text-muted-foreground" />
    </div>
    <Separator className="my-6" />
    <div className="flex flex-wrap gap-2 mb-6">
      <Badge variant="secondary" className="flex gap-1 items-center">
        <MapPin className="h-3 w-3" /> {job.location}
      </Badge>
      <Badge variant="secondary" className="flex gap-1 items-center">
        <DollarSign className="h-3 w-3" /> {job.salary}
      </Badge>
    </div>
    <div className="space-y-6 flex-grow">
      {/* Culture Ratings */}
      {Object.entries(job.culture).map(([key, value]) => (
        <div className="space-y-2" key={key}>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground capitalize">{key}</span>
            <span className="font-medium">{value}/5</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${(value / 5) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
    <p className="text-sm text-muted-foreground text-center mt-6">Tap to see more details</p>
  </Card>
);
